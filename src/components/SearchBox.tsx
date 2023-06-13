import React from 'react';
import { BiSearch } from 'react-icons/bi';

const SearchBox = () => {
  return (
    <div className="filter-box__input-box">
      <BiSearch className="filter-box__input__search-icon" />
      <input
        placeholder="Search for a Pok&#233;mon..."
        className="filter-box__input-box__input"
      />
    </div>
  );
};

export default SearchBox;
