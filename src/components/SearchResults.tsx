import React from 'react';
import { PokemonNameObject } from '../data';

interface Props {
  result: string;
  setResults: React.Dispatch<React.SetStateAction<PokemonNameObject[]>>;
}
export const SearchResult: React.FC<Props> = ({ result, setResults }) => {
  return (
    <div
      onClick={(e) => {
        //alert(`You selected ${result}!`);
        setResults([]);
      }}
      className="filter-box__results-single"
    >
      {result}
    </div>
  );
};
