// Package cache is a fixed-capacity in-memory cache with per-entry TTL,
// LRU eviction, and singleflight loading.
//
// TODO(you): this entire package is yours. Implement it in three stages and
// flip Implemented to true when done — the tests in cache_test.go unskip
// themselves and tell you how you're doing. Run them with:
//
//	cd api && go test -race ./internal/cache/
//
// Stage 1 — LRU: the classic structure is a map[K]*list.Element plus a
// doubly-linked list (container/list in the stdlib). Get moves the entry to
// the front; Set evicts from the back when over capacity. Both O(1).
// Research: "LRU cache design" — this is a literal interview question.
//
// Stage 2 — TTL: store an expiry time.Time in each entry. Expired entries are
// treated as misses on Get (lazy expiry is fine; no background goroutine needed).
//
// Stage 3 — singleflight: GetOrLoad must guarantee that N concurrent callers
// for the same missing key result in exactly ONE call to load, with all N
// receiving its result. Research: "cache stampede" and the design of
// golang.org/x/sync/singleflight — but implement it yourself (hint: keep a
// map[K]*inFlightCall protected by the mutex, where inFlightCall carries a
// channel or sync.WaitGroup callers wait on).
//
// Concurrency: every method must be safe for concurrent use. Decide between
// sync.Mutex and sync.RWMutex — and note that Get MUTATES the LRU list, so
// think carefully before assuming reads can share a lock. Prove safety with:
//
//	go test -race ./internal/cache/
package cache

import (
	"errors"
	"time"
)

// Implemented gates the tests in cache_test.go. Flip to true as you go.
const Implemented = false

var errNotImplemented = errors.New("cache: not implemented")

// Cache is a fixed-capacity LRU cache with per-entry TTL.
// Safe for concurrent use.
type Cache[K comparable, V any] struct {
	capacity int
	ttl      time.Duration

	// TODO(you): your fields here (mutex, map, list, in-flight tracking).
}

// New returns a Cache holding at most capacity entries, each valid for ttl
// after being set.
func New[K comparable, V any](capacity int, ttl time.Duration) *Cache[K, V] {
	return &Cache[K, V]{capacity: capacity, ttl: ttl}
}

// Get returns the cached value and true on a hit. Expired entries are misses.
// A hit marks the entry as most-recently-used.
func (c *Cache[K, V]) Get(key K) (V, bool) {
	// TODO(you): stage 1 + 2.
	var zero V
	return zero, false
}

// Set stores value under key, evicting the least-recently-used entry if the
// cache is at capacity.
func (c *Cache[K, V]) Set(key K, value V) {
	// TODO(you): stage 1.
}

// Len returns the number of live (unexpired) entries.
func (c *Cache[K, V]) Len() int {
	// TODO(you): stage 1.
	return 0
}

// GetOrLoad returns the cached value for key, or — on a miss — calls load,
// caches its result, and returns it. Concurrent callers for the same missing
// key share a single load call (singleflight). If load fails, nothing is
// cached and every waiting caller receives the error.
func (c *Cache[K, V]) GetOrLoad(key K, load func() (V, error)) (V, error) {
	// TODO(you): stage 3. Make Get/Set work first.
	var zero V
	return zero, errNotImplemented
}
