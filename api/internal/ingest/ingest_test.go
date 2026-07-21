package ingest

import (
	"context"
	"errors"
	"fmt"
	"sync"
	"sync/atomic"
	"testing"
	"time"

	"github.com/KuroMaple/poke-view/api/internal/pokeapi"
)

// fakeFetcher counts calls and tracks peak concurrency; fail configures
// per-ID error scripts (each call to a failing ID consumes one error).
type fakeFetcher struct {
	mu       sync.Mutex
	calls    map[int]int
	fail     map[int][]error
	inFlight atomic.Int32
	peak     atomic.Int32
	delay    time.Duration
}

func newFakeFetcher(delay time.Duration) *fakeFetcher {
	return &fakeFetcher{calls: map[int]int{}, fail: map[int][]error{}, delay: delay}
}

func (f *fakeFetcher) FetchPokemon(ctx context.Context, id int) (pokeapi.Pokemon, error) {
	cur := f.inFlight.Add(1)
	defer f.inFlight.Add(-1)
	for {
		p := f.peak.Load()
		if cur <= p || f.peak.CompareAndSwap(p, cur) {
			break
		}
	}
	if f.delay > 0 {
		select {
		case <-time.After(f.delay):
		case <-ctx.Done():
			return pokeapi.Pokemon{}, ctx.Err()
		}
	}

	f.mu.Lock()
	f.calls[id]++
	var err error
	if q := f.fail[id]; len(q) > 0 {
		err, f.fail[id] = q[0], q[1:]
	}
	f.mu.Unlock()

	if err != nil {
		return pokeapi.Pokemon{}, err
	}
	return pokeapi.Pokemon{ID: id, Name: fmt.Sprintf("pkmn-%d", id)}, nil
}

func collectSink() (Sink, *sync.Map) {
	var seen sync.Map
	return func(_ context.Context, p pokeapi.Pokemon) error {
		if _, dup := seen.LoadOrStore(p.ID, true); dup {
			return fmt.Errorf("sink saw ID %d twice", p.ID)
		}
		return nil
	}, &seen
}

func skipUnlessImplemented(t *testing.T, err error) {
	t.Helper()
	if errors.Is(err, errNotImplemented) {
		t.Skip("TODO(you): implement ingest.Run — see the package comment")
	}
}

func TestAllIDsFetchedExactlyOnce(t *testing.T) {
	f := newFakeFetcher(0)
	sink, seen := collectSink()

	err := Run(context.Background(), f, sink, Config{Workers: 4, MaxID: 100, MaxRetries: 2, BaseDelay: time.Millisecond})
	skipUnlessImplemented(t, err)
	if err != nil {
		t.Fatalf("Run: %v", err)
	}

	for id := 1; id <= 100; id++ {
		if _, ok := seen.Load(id); !ok {
			t.Errorf("ID %d never reached the sink", id)
		}
		if n := f.calls[id]; n != 1 {
			t.Errorf("ID %d fetched %d times; want 1", id, n)
		}
	}
}

func TestConcurrencyIsBounded(t *testing.T) {
	f := newFakeFetcher(5 * time.Millisecond)
	sink, _ := collectSink()

	const workers = 3
	err := Run(context.Background(), f, sink, Config{Workers: workers, MaxID: 30, MaxRetries: 0, BaseDelay: time.Millisecond})
	skipUnlessImplemented(t, err)
	if err != nil {
		t.Fatalf("Run: %v", err)
	}
	if p := f.peak.Load(); p > workers {
		t.Fatalf("peak in-flight fetches = %d; must never exceed Workers = %d", p, workers)
	}
	if p := f.peak.Load(); p < 2 {
		t.Fatalf("peak in-flight fetches = %d; work isn't actually running concurrently", p)
	}
}

func TestTransientErrorsAreRetried(t *testing.T) {
	f := newFakeFetcher(0)
	transient := pokeapi.TransientError{}
	f.fail[7] = []error{transient, transient} // fails twice, then succeeds

	sink, seen := collectSink()
	err := Run(context.Background(), f, sink, Config{Workers: 2, MaxID: 10, MaxRetries: 3, BaseDelay: time.Millisecond})
	skipUnlessImplemented(t, err)
	if err != nil {
		t.Fatalf("Run: %v", err)
	}
	if _, ok := seen.Load(7); !ok {
		t.Fatal("ID 7 should have succeeded after retries")
	}
	if n := f.calls[7]; n != 3 {
		t.Errorf("ID 7 fetched %d times; want 3 (two transient failures + success)", n)
	}
}

func TestPermanentErrorsAreNotRetriedAndDontKillTheCrawl(t *testing.T) {
	f := newFakeFetcher(0)
	f.fail[5] = []error{errors.New("404 not found")} // permanent

	sink, seen := collectSink()
	err := Run(context.Background(), f, sink, Config{Workers: 2, MaxID: 10, MaxRetries: 3, BaseDelay: time.Millisecond})
	skipUnlessImplemented(t, err)
	if err != nil {
		t.Fatalf("Run should survive a single bad ID; got: %v", err)
	}
	if n := f.calls[5]; n != 1 {
		t.Errorf("permanent failure fetched %d times; want 1 (no retries)", n)
	}
	if _, ok := seen.Load(5); ok {
		t.Error("failed ID 5 must not reach the sink")
	}
	for id := 1; id <= 10; id++ {
		if id == 5 {
			continue
		}
		if _, ok := seen.Load(id); !ok {
			t.Errorf("ID %d missing — one bad ID killed the rest of the crawl", id)
		}
	}
}

func TestContextCancellationStopsPromptly(t *testing.T) {
	f := newFakeFetcher(10 * time.Millisecond)
	sink, _ := collectSink()

	ctx, cancel := context.WithCancel(context.Background())
	go func() {
		time.Sleep(25 * time.Millisecond)
		cancel()
	}()

	done := make(chan error, 1)
	go func() {
		done <- Run(ctx, f, sink, Config{Workers: 2, MaxID: 10_000, MaxRetries: 0, BaseDelay: time.Millisecond})
	}()

	select {
	case err := <-done:
		skipUnlessImplemented(t, err)
		if !errors.Is(err, context.Canceled) {
			t.Fatalf("Run after cancel returned %v; want context.Canceled", err)
		}
	case <-time.After(2 * time.Second):
		t.Fatal("Run did not return within 2s of cancellation — likely a blocked channel send (see hint 4 in the package comment)")
	}
}
