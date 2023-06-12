import React from 'react';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const Dropdown = () => {
  return (
    <div className="filter-box__dropdown">
      <Select options={options} />
    </div>
  );
};

export default Dropdown;
