package cache

import (
	"errors"
	"sync"
	"sync/atomic"
	"testing"
	"time"
)

func skipUnlessImplemented(t *testing.T) {
	t.Helper()
	if !Implemented {
		t.Skip("TODO(you): flip cache.Implemented to true once you start implementing")
	}
}

func TestGetSet(t *testing.T) {
	skipUnlessImplemented(t)
	c := New[string, int](2, time.Minute)

	if _, ok := c.Get("a"); ok {
		t.Fatal("Get on empty cache reported a hit")
	}
	c.Set("a", 1)
	if v, ok := c.Get("a"); !ok || v != 1 {
		t.Fatalf("Get(a) = %v, %v; want 1, true", v, ok)
	}
	c.Set("a", 2) // overwrite, must not grow
	if v, _ := c.Get("a"); v != 2 {
		t.Fatalf("Get(a) after overwrite = %v; want 2", v)
	}
	if c.Len() != 1 {
		t.Fatalf("Len = %d; want 1", c.Len())
	}
}

func TestLRUEviction(t *testing.T) {
	skipUnlessImplemented(t)
	c := New[string, int](2, time.Minute)

	c.Set("a", 1)
	c.Set("b", 2)
	c.Get("a")    // touch a: b is now least-recently-used
	c.Set("c", 3) // must evict b, not a

	if _, ok := c.Get("b"); ok {
		t.Fatal("b should have been evicted (it was LRU)")
	}
	if _, ok := c.Get("a"); !ok {
		t.Fatal("a was evicted despite being recently used")
	}
	if _, ok := c.Get("c"); !ok {
		t.Fatal("c missing")
	}
}

func TestTTLExpiry(t *testing.T) {
	skipUnlessImplemented(t)
	c := New[string, int](10, 20*time.Millisecond)

	c.Set("a", 1)
	if _, ok := c.Get("a"); !ok {
		t.Fatal("entry expired immediately")
	}
	time.Sleep(30 * time.Millisecond)
	if _, ok := c.Get("a"); ok {
		t.Fatal("expired entry still returned")
	}
}

func TestGetOrLoadSingleflight(t *testing.T) {
	skipUnlessImplemented(t)
	c := New[string, int](10, time.Minute)

	var loads atomic.Int32
	const callers = 50

	var wg sync.WaitGroup
	start := make(chan struct{})
	for i := 0; i < callers; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			<-start
			v, err := c.GetOrLoad("key", func() (int, error) {
				loads.Add(1)
				time.Sleep(10 * time.Millisecond) // widen the race window
				return 42, nil
			})
			if err != nil {
				t.Errorf("GetOrLoad: %v", err)
			}
			if v != 42 {
				t.Errorf("GetOrLoad = %d; want 42", v)
			}
		}()
	}
	close(start)
	wg.Wait()

	if n := loads.Load(); n != 1 {
		t.Fatalf("load ran %d times for %d concurrent callers; want exactly 1", n, callers)
	}
}

func TestGetOrLoadErrorNotCached(t *testing.T) {
	skipUnlessImplemented(t)
	c := New[string, int](10, time.Minute)

	boom := errors.New("boom")
	if _, err := c.GetOrLoad("k", func() (int, error) { return 0, boom }); !errors.Is(err, boom) {
		t.Fatalf("err = %v; want boom", err)
	}
	// After a failed load the next call must try again.
	v, err := c.GetOrLoad("k", func() (int, error) { return 7, nil })
	if err != nil || v != 7 {
		t.Fatalf("second GetOrLoad = %v, %v; want 7, nil (errors must not be cached)", v, err)
	}
}
