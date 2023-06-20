import React, { useState } from 'react';
import Dropdown from './Dropdown';
import SearchBox from './SearchBox';
import { SearchResult } from './SearchResults';
import { SearchResultsList } from './SearchResultsList';
import { PokemonNameObject } from '../data';

const FilterBox = () => {
  const [results, setResults] = useState<PokemonNameObject[]>([]);

  return (
    <div className="filter-box">
      <div className="filter-box__search-container">
        <SearchBox setResults={setResults} />
        {results && results.length > 0 && (
          <SearchResultsList results={results} setResults={setResults} />
        )}
      </div>
      <Dropdown />
    </div>
  );
};

export default FilterBox;
