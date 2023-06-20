import React, { useContext } from 'react';
import { PokemonNameObject } from '../data';
import { PokemonContext } from '../context/PokemonContext';

interface Props {
  result: string;
  setResults: React.Dispatch<React.SetStateAction<PokemonNameObject[]>>;
}
export const SearchResult: React.FC<Props> = ({ result, setResults }) => {
  // Pokemon array and all operations on array
  const pokemonProvided = useContext(PokemonContext);

  return (
    <div
      onClick={(e) => {
        pokemonProvided.handleAddCardByName(result);
        setResults([]);
      }}
      className="filter-box__results-single"
    >
      {result}
    </div>
  );
};
