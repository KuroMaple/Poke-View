// Command ingest crawls PokéAPI and loads the local database.
//
//	go run ./cmd/ingest -workers 8 -max-id 649
//
// Until ingest.Run is implemented (TODO(you) — see internal/ingest) this
// exits with "not implemented". The sink currently just logs; the Postgres
// upsert sink lands with the Days 3-5 store work.
package main

import (
	"context"
	"flag"
	"log/slog"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/KuroMaple/poke-view/api/internal/ingest"
	"github.com/KuroMaple/poke-view/api/internal/pokeapi"
)

func main() {
	workers := flag.Int("workers", 8, "max concurrent fetches")
	maxID := flag.Int("max-id", 649, "crawl pokemon IDs 1..max-id")
	flag.Parse()

	logger := slog.New(slog.NewTextHandler(os.Stderr, nil))

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	// TODO(me): replace with the Postgres upsert sink once the store
	// repositories land (Days 3-5).
	sink := func(_ context.Context, p pokeapi.Pokemon) error {
		logger.Info("fetched", "id", p.ID, "name", p.Name)
		return nil
	}

	start := time.Now()
	err := ingest.Run(ctx, pokeapi.NewClient(), sink, ingest.Config{
		Workers:    *workers,
		MaxID:      *maxID,
		MaxRetries: 3,
		BaseDelay:  500 * time.Millisecond,
	})
	if err != nil {
		logger.Error("ingest failed", "error", err)
		os.Exit(1)
	}
	logger.Info("ingest complete", "duration", time.Since(start))
}
