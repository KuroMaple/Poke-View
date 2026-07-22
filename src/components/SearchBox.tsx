import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import pokeAPI from '../poke-api';
import { PokemonNameObject } from '../data';

interface Props {
  setResults: React.Dispatch<React.SetStateAction<PokemonNameObject[]>>;
}

const filterNames = (query: string, names: PokemonNameObject[]) => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return names.filter((pkmn) => pkmn?.name?.toLowerCase().includes(q));
};

const SearchBox: React.FC<Props> = ({ setResults }) => {
  const [input, setInput] = useState('');
  const [pokemonNames, setPokemonNames] = useState<PokemonNameObject[]>([]);

  // Fetch the full name list once; every keystroke then filters it in memory.
  useEffect(() => {
    const loadNames = async () => {
      try {
        setPokemonNames(await pokeAPI.getPokemonNames());
      } catch (error) {
        console.error('Failed to load Pokémon names for search:', error);
      }
    };
    loadNames();
  }, []);

  // Recompute results whenever the query or the loaded list changes.
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
