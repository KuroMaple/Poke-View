# Local dev entry points. `make db-up api-dev` gets you a running API.

LOCAL_DB_URL := postgres://pokeview:pokeview@localhost:5433/pokeview?sslmode=disable

.PHONY: db-up db-down api-dev api-test api-lint ingest web-dev

db-up:
	docker compose up -d db --wait

db-down:
	docker compose down

api-dev:
	cd api && DATABASE_URL="$(LOCAL_DB_URL)" go run ./cmd/server

api-test:
	cd api && go test -race ./...

api-lint:
	cd api && go vet ./... && gofmt -l . && test -z "$$(gofmt -l .)"

ingest:
	cd api && DATABASE_URL="$(LOCAL_DB_URL)" go run ./cmd/ingest

web-dev:
	npm run dev
