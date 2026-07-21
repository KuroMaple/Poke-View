-- Core schema: Pokémon, types, the 18x18 effectiveness matrix, moves, and
-- localized flavor text. Battles are deliberately NOT persisted (in-memory
-- only) — see docs/adr/0003-in-memory-battles.md.

CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TABLE types (
    id   SMALLINT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE type_effectiveness (
    attacker_type_id SMALLINT NOT NULL REFERENCES types (id),
    defender_type_id SMALLINT NOT NULL REFERENCES types (id),
    multiplier       NUMERIC(3, 2) NOT NULL, -- 0, 0.5, 1, 2
    PRIMARY KEY (attacker_type_id, defender_type_id)
);

CREATE TABLE pokemon (
    id                    INTEGER PRIMARY KEY, -- national dex number, from PokéAPI
    name                  TEXT NOT NULL UNIQUE,
    hp                    SMALLINT NOT NULL,
    atk                   SMALLINT NOT NULL,
    def                   SMALLINT NOT NULL,
    sp_atk                SMALLINT NOT NULL,
    sp_def                SMALLINT NOT NULL,
    speed                 SMALLINT NOT NULL,
    sprite_front          TEXT,
    sprite_shiny          TEXT,
    sprite_animated_front TEXT,
    sprite_animated_back  TEXT
);

-- Fuzzy search index. Compare query plans with and without it:
--   EXPLAIN ANALYZE SELECT * FROM pokemon WHERE name % 'charzard';
CREATE INDEX pokemon_name_trgm ON pokemon USING gin (name gin_trgm_ops);

CREATE TABLE pokemon_types (
    pokemon_id INTEGER NOT NULL REFERENCES pokemon (id) ON DELETE CASCADE,
    type_id    SMALLINT NOT NULL REFERENCES types (id),
    slot       SMALLINT NOT NULL, -- 1 = primary, 2 = secondary
    PRIMARY KEY (pokemon_id, slot)
);

CREATE TABLE moves (
    id           INTEGER PRIMARY KEY, -- PokéAPI move id
    name         TEXT NOT NULL UNIQUE,
    type_id      SMALLINT NOT NULL REFERENCES types (id),
    damage_class TEXT NOT NULL CHECK (damage_class IN ('physical', 'special', 'status')),
    power        SMALLINT,            -- NULL for status moves
    accuracy     SMALLINT,            -- NULL = never misses
    pp           SMALLINT NOT NULL
);

CREATE TABLE pokemon_moves (
    pokemon_id INTEGER NOT NULL REFERENCES pokemon (id) ON DELETE CASCADE,
    move_id    INTEGER NOT NULL REFERENCES moves (id),
    PRIMARY KEY (pokemon_id, move_id)
);

CREATE TABLE flavor_texts (
    pokemon_id INTEGER NOT NULL REFERENCES pokemon (id) ON DELETE CASCADE,
    language   TEXT NOT NULL,
    text       TEXT NOT NULL,
    PRIMARY KEY (pokemon_id, language)
);
