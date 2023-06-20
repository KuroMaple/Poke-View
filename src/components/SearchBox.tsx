import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import pokeAPI from '../poke-api';
import { PokemonNameObject } from '../data';

interface Props {
  setResults: React.Dispatch<React.SetStateAction<PokemonNameObject[]>>;
}

const SearchBox: React.FC<Props> = ({ setResults }) => {
  const [input, setInput] = useState('');

  const fetchData = async (value: string) => {
    const api = pokeAPI;
    const pkmnNames: PokemonNameObject[] = await api.getPokemonNames();
    const results = pkmnNames.filter((curPkmn) => {
      return (
        value &&
        curPkmn &&
        curPkmn.name &&
        curPkmn.name.toLowerCase().includes(value)
      );
    });

    setResults(results);
  };

  const handleChange = (value: string) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="filter-box__input-box">
      <BiSearch className="filter-box__input__search-icon" />
      <input
        placeholder="Search for a Pok&#233;mon..."
        className="filter-box__input-box__input"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
