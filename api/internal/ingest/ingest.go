// Package ingest crawls PokéAPI with a bounded worker pool and hands results
// to a sink (in production: idempotent upserts into Postgres).
//
// TODO(you): Run is yours — it's the Days 3-5 milestone. The tests in
// ingest_test.go define the contract precisely; delete the errNotImplemented
// return and they unskip themselves:
//
//	cd api && go test -race ./internal/ingest/
//
// The shape to research first ("Go worker pool pattern"):
//
//	jobs := make(chan int)          // one goroutine feeds IDs in
//	var wg sync.WaitGroup           // one goroutine per worker
//	for range workers { ... }       // each worker ranges over jobs
//
// Requirements the tests enforce:
//
//  1. Every ID in [1, cfg.MaxID] is fetched and passed to sink exactly once
//     (order doesn't matter).
//  2. At most cfg.Workers fetches are in flight at any moment.
//  3. A pokeapi.TransientError is retried up to cfg.MaxRetries times with
//     exponential backoff + jitter (research why jitter matters: "thundering
//     herd exponential backoff"). Permanent errors are NOT retried — log and
//     move on; one bad ID must not kill the crawl.
//  4. When ctx is cancelled (Ctrl-C), workers stop promptly and Run returns
//     ctx.Err(). Hint: a plain `jobs <- id` send can block forever if workers
//     have exited — use a select with <-ctx.Done() on the sending side too.
//
// Design decisions that are deliberately YOURS to make (document your choice
// in a comment): unbuffered vs buffered jobs channel; where backoff sleeping
// happens (worker vs a requeue); how sink errors are surfaced.
package ingest

import (
	"context"
	"errors"
	"time"

	"github.com/KuroMaple/poke-view/api/internal/pokeapi"
)

var errNotImplemented = errors.New("ingest: not implemented")

// Fetcher is the subset of *pokeapi.Client that Run needs. It's an interface
// so tests can substitute a fake — the standard Go seam for testing without
// the network.
type Fetcher interface {
	FetchPokemon(ctx context.Context, id int) (pokeapi.Pokemon, error)
}

// Sink receives each successfully fetched Pokémon. Implementations must be
// safe for concurrent calls (the Postgres sink will be — pgxpool handles it).
type Sink func(ctx context.Context, p pokeapi.Pokemon) error

type Config struct {
	Workers    int           // max concurrent fetches
	MaxID      int           // crawl IDs 1..MaxID inclusive
	MaxRetries int           // per-ID retry budget for transient errors
	BaseDelay  time.Duration // initial backoff delay (tests use ~1ms)
}

// Run crawls IDs [1, cfg.MaxID], fetching with at most cfg.Workers in flight,
// and passes each result to sink. See the package comment for the full contract.
func Run(ctx context.Context, f Fetcher, sink Sink, cfg Config) error {
	// TODO(you): implement me.
	_ = f
	_ = sink
	_ = cfg
	return errNotImplemented
}
