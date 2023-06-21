/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from 'react';
import Select, { MultiValue, SingleValue, StylesConfig } from 'react-select';
import chroma from 'chroma-js';
import { ColourOption, colourOptions } from '../data';
import { PokemonType, TypeContext } from '../context/typeContext';

const dot = (color = 'transparent') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const colourStyles: StylesConfig<ColourOption> = {
  control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
          ? 'white'
          : 'black'
        : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};

const Dropdown = () => {
  const providedValue = useContext(TypeContext); // Contains the current type chosen to be filtered by

  // maps the filter type to a Colour option
  const typeToColour = (type: PokemonType) => {
    switch (type) {
      case 'all':
        return 0;
      case 'normal':
        return 1;
      case 'fire':
        return 2;
      case 'water':
        return 3;
      case 'grass':
        return 4;
      case 'electric':
        return 5;
      case 'ice':
        return 6;
      case 'fighting':
        return 7;
      case 'poison':
        return 8;
      case 'ground':
        return 9;
      case 'flying':
        return 10;
      case 'psychic':
        return 11;
      case 'bug':
        return 12;
      case 'rock':
        return 13;
      case 'ghost':
        return 14;
      case 'dragon':
        return 15;
      case 'dark':
        return 16;
      case 'steel':
        return 17;
      case 'fairy':
        return 18;
      default:
        return -1; // Return -1 or handle the default case as per your requirement
    }
  };

  // handles the onchange effects of the dropdown
  const updateType = (
    e: MultiValue<ColourOption> | SingleValue<ColourOption>
  ) => {
    switch (e) {
      case colourOptions[0]:
        providedValue.setType('all');
        document.body.style.setProperty(
          'background-color',
          'var(--background)'
        );
        break;
      case colourOptions[1]:
        providedValue.setType('normal');
        document.body.style.setProperty(
          'background-color',
          'var(--type-normal)'
        );
        break;
      case colourOptions[2]:
        providedValue.setType('fire');
        document.body.style.setProperty('background-color', 'var(--type-fire)');
        break;
      case colourOptions[3]:
        providedValue.setType('water');
        document.body.style.setProperty(
          'background-color',
          'var(--type-water)'
        );
        break;
      case colourOptions[4]:
        providedValue.setType('grass');
        document.body.style.setProperty(
          'background-color',
          'var(--type-grass)'
        );
        break;
      case colourOptions[5]:
        providedValue.setType('electric');
        document.body.style.setProperty(
          'background-color',
          'var(--type-electric)'
        );
        break;
      case colourOptions[6]:
        providedValue.setType('ice');
        document.body.style.setProperty('background-color', 'var(--type-ice)');
        break;
      case colourOptions[7]:
        providedValue.setType('fighting');
        document.body.style.setProperty(
          'background-color',
          'var(--type-fighting)'
        );
        break;
      case colourOptions[8]:
        providedValue.setType('poison');
        document.body.style.setProperty(
          'background-color',
          'var(--type-poison)'
        );
        break;
      case colourOptions[9]:
        providedValue.setType('ground');
        document.body.style.setProperty(
          'background-color',
          'var(--type-ground)'
        );
        break;
      case colourOptions[10]:
        providedValue.setType('flying');
        document.body.style.setProperty(
          'background-color',
          'var(--type-flying)'
        );
        break;
      case colourOptions[11]:
        providedValue.setType('psychic');
        document.body.style.setProperty(
          'background-color',
          'var(--type-psychic)'
        );
        break;
      case colourOptions[12]:
        providedValue.setType('bug');
        document.body.style.setProperty('background-color', 'var(--type-bug)');
        break;
      case colourOptions[13]:
        providedValue.setType('rock');
        document.body.style.setProperty('background-color', 'var(--type-rock)');
        break;
      case colourOptions[14]:
        providedValue.setType('ghost');
        document.body.style.setProperty(
          'background-color',
          'var(--type-ghost)'
        );
        break;
      case colourOptions[15]:
        providedValue.setType('dragon');
        document.body.style.setProperty(
          'background-color',
          'var(--type-dragon)'
        );
        break;
      case colourOptions[16]:
        providedValue.setType('dark');
        document.body.style.setProperty('background-color', 'var(--type-dark)');
        break;
      case colourOptions[17]:
        providedValue.setType('steel');
        document.body.style.setProperty(
          'background-color',
          'var(--type-steel)'
        );
        break;
      case colourOptions[18]:
        providedValue.setType('fairy');
        document.body.style.setProperty(
          'background-color',
          'var(--type-fairy)'
        );
        break;
      default:
        break;
    }
    console.log(e);
  };

  return (
    <div className="filter-box__dropdown">
      <Select
        options={colourOptions}
        placeholder="Filter by Type"
        styles={colourStyles}
        value={colourOptions[typeToColour(providedValue.type)]}
        onChange={(e) => updateType(e)}
      />
    </div>
  );
};

export default Dropdown;
