# ADR 0001: Single Go service on net/http, no web framework

Date: 2026-07-21. Status: accepted.

## Context

PokeView v2 adds a backend to what was a client-only SPA consuming PokéAPI
directly. The author's target roles are backend/systems engineering; the
backend is the portfolio centerpiece and must show design judgment, not
framework fluency.

## Decision

One Go service (`api/`) using the standard library's `net/http` with Go 1.22+
method-aware routing. Layers: `httpapi` (transport) → domain packages
(`battle`, `ingest`, `cache`) → `store` (persistence). No microservices, no
framework (chi/echo/gin), no ORM.

## Consequences

- Everything HTTP-shaped (middleware, routing, graceful shutdown) is visible
  in ~150 lines of our own code rather than hidden in a dependency —
  which is the point.
- We hand-write some conveniences frameworks give for free (typed route
  params, middleware chaining). Accepted: the app has ~6 routes.
- Microservices were rejected because there is one developer, one domain, and
  no independent scaling requirement; the operational cost (deploys, service
  discovery, partial failures) buys nothing here.

## Revisit if

The route count grows past ~20, or a second deployable with different scaling
characteristics genuinely emerges (e.g. a WebSocket battle relay).
