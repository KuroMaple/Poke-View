# ADR 0002: Hand-rolled cache and migrations instead of Redis and a migration framework

Date: 2026-07-21. Status: accepted.

## Context

The read path (Pokémon data) is small (~650 rows), immutable between ingest
runs, and read-heavy. Standard practice would be Redis in front of Postgres
and a migration tool like goose or golang-migrate.

## Decision

- **Cache**: an in-process generic LRU+TTL cache with singleflight
  (`internal/cache`), written from scratch.
- **Migrations**: an embedded ~60-line runner (`store.migrate`) applying
  `migrations/*.sql` in filename order, tracked in a `schema_migrations`
  table.
- Only third-party dependency: `pgx` (a Postgres driver is not a reasonable
  thing to hand-roll).

## Consequences

- Zero extra infrastructure to host (the deployment budget is $0), and cache
  hits cost a mutex + map lookup instead of a network round trip.
- An in-process cache is per-instance: if the API ever runs >1 replica,
  instances cache independently and hit rate drops. Accepted at this scale;
  Redis becomes the right call at that point and this ADR gets superseded.
- The migration runner has no down-migrations and no checksums. Accepted:
  forward-only migrations are a defensible production stance, and the
  dataset is rebuildable from ingest at any time.
- Tradeoff acknowledged: writing your own cache in a team codebase is usually
  the wrong call. Here the cache IS part of the deliverable (demonstrating
  LRU design, TTL semantics, and stampede protection), not incidental
  plumbing.
