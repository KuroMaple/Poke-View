// Command server runs the PokeView HTTP API.
//
// Configuration is via environment variables:
//
//	PORT          port to listen on (default 8080)
//	DATABASE_URL  Postgres connection string. If unset the server still starts
//	              (so `go run ./cmd/server` works out of the box) but /readyz
//	              reports not-ready and data endpoints return 503.
package main

import (
	"context"
	"errors"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/KuroMaple/poke-view/api/internal/httpapi"
	"github.com/KuroMaple/poke-view/api/internal/store"
)

func main() {
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	slog.SetDefault(logger)

	if err := run(logger); err != nil {
		logger.Error("server exited", "error", err)
		os.Exit(1)
	}
}

func run(logger *slog.Logger) error {
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	var st *store.Store
	if dsn := os.Getenv("DATABASE_URL"); dsn != "" {
		var err error
		st, err = store.Open(ctx, dsn)
		if err != nil {
			return err
		}
		defer st.Close()
		logger.Info("connected to database, migrations applied")
	} else {
		logger.Warn("DATABASE_URL not set; running without a database")
	}

	srv := &http.Server{
		Addr:              ":" + port,
		Handler:           httpapi.New(logger, st),
		ReadHeaderTimeout: 5 * time.Second,
	}

	errCh := make(chan error, 1)
	go func() {
		logger.Info("listening", "addr", srv.Addr)
		errCh <- srv.ListenAndServe()
	}()

	select {
	case err := <-errCh:
		return err
	case <-ctx.Done():
		logger.Info("shutting down")
		shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		if err := srv.Shutdown(shutdownCtx); err != nil {
			return err
		}
		if err := <-errCh; !errors.Is(err, http.ErrServerClosed) {
			return err
		}
		return nil
	}
}
