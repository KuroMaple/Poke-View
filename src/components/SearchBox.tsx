import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import pokeAPI from '../poke-api';
import { PokemonNameObject } from '../data';

interface Props {
  setResults: React.Dispatch<React.SetStateAction<PokemonNameObject[]>>;
}

const SearchBox: React.FC<Props> = ({ setResults }) => {
  const [input, setInput] = useState('');

  // TODO(you) BUG #3: three problems in this search path.
  // (a) Every keystroke refetches the full 649-name list — but the list never
  //     changes; fetch it once and reuse it (module-level promise, or state
  //     in FilterBox).
  // (b) No debounce: typing "pikachu" fires 7 requests. ~200ms debounce.
  // (c) No cancellation/ordering: a slow response for "pika" can resolve
  //     AFTER the response for "pikachu" and clobber it. Pass an
  //     AbortController signal and abort the previous request on each change.
  // Research: "AbortController fetch React", "debounce vs throttle".
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
