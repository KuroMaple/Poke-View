// Package pokeapi is a minimal typed client for the endpoints the ingest
// pipeline needs. Only used at ingest time — the serving path never touches
// PokéAPI.
package pokeapi

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

const baseURL = "https://pokeapi.co/api/v2"

type Client struct {
	http *http.Client
}

func NewClient() *Client {
	return &Client{http: &http.Client{Timeout: 15 * time.Second}}
}

// Pokemon mirrors the fields of /pokemon/{id} that we ingest.
type Pokemon struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Stats []struct {
		BaseStat int `json:"base_stat"`
		Stat     struct {
			Name string `json:"name"` // "hp", "attack", ...
		} `json:"stat"`
	} `json:"stats"`
	Types []struct {
		Slot int `json:"slot"`
		Type struct {
			Name string `json:"name"`
		} `json:"type"`
	} `json:"types"`
	Sprites struct {
		FrontDefault string `json:"front_default"`
		FrontShiny   string `json:"front_shiny"`
	} `json:"sprites"`
}

// Species mirrors the fields of /pokemon-species/{id} that we ingest.
// Keyed by numeric ID, never by name — name-keyed lookups broke on forms
// like "tornadus-incarnate" in v1.
type Species struct {
	FlavorTextEntries []struct {
		FlavorText string `json:"flavor_text"`
		Language   struct {
			Name string `json:"name"`
		} `json:"language"`
	} `json:"flavor_text_entries"`
}

func (c *Client) FetchPokemon(ctx context.Context, id int) (Pokemon, error) {
	var p Pokemon
	err := c.getJSON(ctx, fmt.Sprintf("%s/pokemon/%d", baseURL, id), &p)
	return p, err
}

func (c *Client) FetchSpecies(ctx context.Context, id int) (Species, error) {
	var s Species
	err := c.getJSON(ctx, fmt.Sprintf("%s/pokemon-species/%d", baseURL, id), &s)
	return s, err
}

// TransientError marks failures worth retrying (5xx, rate limits, timeouts),
// as opposed to permanent ones (404, decode errors).
type TransientError struct{ error }

func (e TransientError) Unwrap() error { return e.error }

func (c *Client) getJSON(ctx context.Context, url string, v any) error {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return err
	}
	resp, err := c.http.Do(req)
	if err != nil {
		return TransientError{err} // network errors and timeouts are retryable
	}
	defer resp.Body.Close()

	switch {
	case resp.StatusCode == http.StatusOK:
		return json.NewDecoder(resp.Body).Decode(v)
	case resp.StatusCode == http.StatusTooManyRequests || resp.StatusCode >= 500:
		return TransientError{fmt.Errorf("pokeapi: %s returned %d", url, resp.StatusCode)}
	default:
		return fmt.Errorf("pokeapi: %s returned %d", url, resp.StatusCode)
	}
}
