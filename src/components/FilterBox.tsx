import React from 'react';
import Dropdown from './Dropdown';
import SearchBox from './SearchBox';

const FilterBox = () => {
  return (
    <div className="filter-box">
      <SearchBox />
      <Dropdown />
    </div>
  );
};

export default FilterBox;
