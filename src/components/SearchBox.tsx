import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import pokeAPI from '../poke-api';
import { PokemonNameObject } from '../data';

interface Props {
  setResults: React.Dispatch<React.SetStateAction<PokemonNameObject[]>>;
}

// Pure filter: an empty query yields no results; otherwise a case-insensitive
// substring match. Declared outside the component so it captures nothing and
// is trivially testable in isolation.
const filterNames = (query: string, names: PokemonNameObject[]) => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return names.filter((pkmn) => pkmn?.name?.toLowerCase().includes(q));
};

const SearchBox: React.FC<Props> = ({ setResults }) => {
  const [input, setInput] = useState('');
  const [pokemonNames, setPokemonNames] = useState<PokemonNameObject[]>([]);

  // Fetch the full name list once on mount. It never changes, so every
  // keystroke afterwards filters it in memory — no per-keystroke requests,
  // and therefore no debounce and no request-ordering races to reason about.
  useEffect(() => {
    const loadNames = async () => {
      try {
        setPokemonNames(await pokeAPI.getPokemonNames());
      } catch (error) {
        // A failed load leaves search empty rather than crashing — but log it,
        // so a broken API doesn't fail silently.
        console.error('Failed to load Pokémon names for search:', error);
      }
    };
    loadNames();
  }, []);

  // Results are a pure derivation of (query, list). Recomputing here means the
  // filter re-runs both when the user types AND when the list finishes loading,
  // so a query entered before the fetch resolves isn't left showing nothing.
  useEffect(() => {
    setResults(filterNames(input, pokemonNames));
  }, [input, pokemonNames, setResults]);

  return (
    <div className="filter-box__input-box">
      <BiSearch className="filter-box__input__search-icon" />
      <input
        placeholder="Search for a Pok&#233;mon..."
        className="filter-box__input-box__input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
