// Package httpapi wires HTTP routes to the rest of the application.
// Plain net/http — Go 1.22+ method-aware routing patterns, no framework.
package httpapi

import (
	"context"
	"encoding/json"
	"log/slog"
	"net/http"
	"time"

	"github.com/KuroMaple/poke-view/api/internal/store"
)

type Server struct {
	logger *slog.Logger
	store  *store.Store // nil when running without a database
}

func New(logger *slog.Logger, st *store.Store) http.Handler {
	s := &Server{logger: logger, store: st}

	mux := http.NewServeMux()
	mux.HandleFunc("GET /healthz", s.handleHealthz)
	mux.HandleFunc("GET /readyz", s.handleReadyz)

	// Day 6-7 endpoints land here:
	//   GET /api/pokemon            (cursor-paginated list)
	//   GET /api/pokemon/{id}
	//   GET /api/search?q=          (pg_trgm fuzzy search)
	// Day 8-11:
	//   POST /api/battles
	//   POST /api/battles/{id}/actions

	return chain(mux,
		s.recoverPanic,
		s.requestID,
		s.logRequests,
	)
}

// chain applies middleware so the first listed runs outermost.
func chain(h http.Handler, mw ...func(http.Handler) http.Handler) http.Handler {
	for i := len(mw) - 1; i >= 0; i-- {
		h = mw[i](h)
	}
	return h
}

func (s *Server) handleHealthz(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

func (s *Server) handleReadyz(w http.ResponseWriter, r *http.Request) {
	if s.store == nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status": "no database configured"})
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 2*time.Second)
	defer cancel()
	if err := s.store.Ping(ctx); err != nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status": "database unreachable"})
		return
	}
	writeJSON(w, http.StatusOK, map[string]string{"status": "ready"})
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}
