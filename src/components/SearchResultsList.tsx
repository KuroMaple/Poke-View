import { PokemonNameObject } from '../data';
import { SearchResult } from './SearchResults';
import React from 'react';

interface Props {
  results: PokemonNameObject[];
  setResults: React.Dispatch<React.SetStateAction<PokemonNameObject[]>>;
}

export const SearchResultsList: React.FC<Props> = ({ results, setResults }) => {
  return (
    <div className="filter-box__results-list">
      {results.map((result, id) => {
        return (
          <SearchResult result={result.name} key={id} setResults={setResults} />
        );
      })}
    </div>
  );
};
