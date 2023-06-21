/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from 'react';
import Select, { MultiValue, SingleValue, StylesConfig } from 'react-select';
import chroma from 'chroma-js';
import { ColourOption, colourOptionsDark, colourOptionsLight } from '../data';
import { PokemonType, TypeContext } from '../context/typeContext';
import { DarkModeContext } from '../context/DarkModeContext';

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

const colourStylesLight: StylesConfig<ColourOption> = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
  }),
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

const colourStylesDark: StylesConfig<ColourOption> = {
  control: (styles) => ({
    ...styles,
    backgroundColor: '#228636',
  }),
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

  // Dark mode context
  const { isDarkMode, setDarkMode } = useContext(DarkModeContext);
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
  const updateTypeLight = (
    e: MultiValue<ColourOption> | SingleValue<ColourOption>
  ) => {
    switch (e) {
      case colourOptionsLight[0] || colourOptionsDark[0]:
        providedValue.setType('all');
        document.body.style.setProperty(
          'background-color',
          'var(--background)'
        );
        break;
      case colourOptionsLight[1]:
        providedValue.setType('normal');
        document.body.style.setProperty(
          'background-color',
          'var(--type-normal)'
        );
        break;
      case colourOptionsLight[2]:
        providedValue.setType('fire');
        document.body.style.setProperty('background-color', 'var(--type-fire)');
        break;
      case colourOptionsLight[3]:
        providedValue.setType('water');
        document.body.style.setProperty(
          'background-color',
          'var(--type-water)'
        );
        break;
      case colourOptionsLight[4]:
        providedValue.setType('grass');
        document.body.style.setProperty(
          'background-color',
          'var(--type-grass)'
        );
        break;
      case colourOptionsLight[5]:
        providedValue.setType('electric');
        document.body.style.setProperty(
          'background-color',
          'var(--type-electric)'
        );
        break;
      case colourOptionsLight[6]:
        providedValue.setType('ice');
        document.body.style.setProperty('background-color', 'var(--type-ice)');
        break;
      case colourOptionsLight[7]:
        providedValue.setType('fighting');
        document.body.style.setProperty(
          'background-color',
          'var(--type-fighting)'
        );
        break;
      case colourOptionsLight[8]:
        providedValue.setType('poison');
        document.body.style.setProperty(
          'background-color',
          'var(--type-poison)'
        );
        break;
      case colourOptionsLight[9]:
        providedValue.setType('ground');
        document.body.style.setProperty(
          'background-color',
          'var(--type-ground)'
        );
        break;
      case colourOptionsLight[10]:
        providedValue.setType('flying');
        document.body.style.setProperty(
          'background-color',
          'var(--type-flying)'
        );
        break;
      case colourOptionsLight[11]:
        providedValue.setType('psychic');
        document.body.style.setProperty(
          'background-color',
          'var(--type-psychic)'
        );
        break;
      case colourOptionsLight[12]:
        providedValue.setType('bug');
        document.body.style.setProperty('background-color', 'var(--type-bug)');
        break;
      case colourOptionsLight[13]:
        providedValue.setType('rock');
        document.body.style.setProperty('background-color', 'var(--type-rock)');
        break;
      case colourOptionsLight[14]:
        providedValue.setType('ghost');
        document.body.style.setProperty(
          'background-color',
          'var(--type-ghost)'
        );
        break;
      case colourOptionsLight[15]:
        providedValue.setType('dragon');
        document.body.style.setProperty(
          'background-color',
          'var(--type-dragon)'
        );
        break;
      case colourOptionsLight[16]:
        providedValue.setType('dark');
        document.body.style.setProperty('background-color', 'var(--type-dark)');
        break;
      case colourOptionsLight[17]:
        providedValue.setType('steel');
        document.body.style.setProperty(
          'background-color',
          'var(--type-steel)'
        );
        break;
      case colourOptionsLight[18]:
        providedValue.setType('fairy');
        document.body.style.setProperty(
          'background-color',
          'var(--type-fairy)'
        );
        break;
      default:
        break;
    }
  };

  // handles the onchange effects of the dropdown
  const updateTypeDark = (
    e: MultiValue<ColourOption> | SingleValue<ColourOption>
  ) => {
    switch (e) {
      case colourOptionsDark[0]:
        providedValue.setType('all');
        document.body.style.setProperty(
          'background-color',
          'var(--background)'
        );
        break;
      case colourOptionsDark[1]:
        providedValue.setType('normal');
        document.body.style.setProperty(
          'background-color',
          'var(--type-normal)'
        );
        break;
      case colourOptionsDark[2]:
        providedValue.setType('fire');
        document.body.style.setProperty('background-color', 'var(--type-fire)');
        break;
      case colourOptionsDark[3]:
        providedValue.setType('water');
        document.body.style.setProperty(
          'background-color',
          'var(--type-water)'
        );
        break;
      case colourOptionsDark[4]:
        providedValue.setType('grass');
        document.body.style.setProperty(
          'background-color',
          'var(--type-grass)'
        );
        break;
      case colourOptionsDark[5]:
        providedValue.setType('electric');
        document.body.style.setProperty(
          'background-color',
          'var(--type-electric)'
        );
        break;
      case colourOptionsDark[6]:
        providedValue.setType('ice');
        document.body.style.setProperty('background-color', 'var(--type-ice)');
        break;
      case colourOptionsDark[7]:
        providedValue.setType('fighting');
        document.body.style.setProperty(
          'background-color',
          'var(--type-fighting)'
        );
        break;
      case colourOptionsDark[8]:
        providedValue.setType('poison');
        document.body.style.setProperty(
          'background-color',
          'var(--type-poison)'
        );
        break;
      case colourOptionsDark[9]:
        providedValue.setType('ground');
        document.body.style.setProperty(
          'background-color',
          'var(--type-ground)'
        );
        break;
      case colourOptionsDark[10]:
        providedValue.setType('flying');
        document.body.style.setProperty(
          'background-color',
          'var(--type-flying)'
        );
        break;
      case colourOptionsDark[11]:
        providedValue.setType('psychic');
        document.body.style.setProperty(
          'background-color',
          'var(--type-psychic)'
        );
        break;
      case colourOptionsDark[12]:
        providedValue.setType('bug');
        document.body.style.setProperty('background-color', 'var(--type-bug)');
        break;
      case colourOptionsDark[13]:
        providedValue.setType('rock');
        document.body.style.setProperty('background-color', 'var(--type-rock)');
        break;
      case colourOptionsDark[14]:
        providedValue.setType('ghost');
        document.body.style.setProperty(
          'background-color',
          'var(--type-ghost)'
        );
        break;
      case colourOptionsDark[15]:
        providedValue.setType('dragon');
        document.body.style.setProperty(
          'background-color',
          'var(--type-dragon)'
        );
        break;
      case colourOptionsDark[16]:
        providedValue.setType('dark');
        document.body.style.setProperty('background-color', 'var(--type-dark)');
        break;
      case colourOptionsDark[17]:
        providedValue.setType('steel');
        document.body.style.setProperty(
          'background-color',
          'var(--type-steel)'
        );
        break;
      case colourOptionsDark[18]:
        providedValue.setType('fairy');
        document.body.style.setProperty(
          'background-color',
          'var(--type-fairy)'
        );
        break;
      default:
        break;
    }
  };
  return (
    <div className="filter-box__dropdown">
      {isDarkMode ? (
        <Select
          options={colourOptionsDark}
          placeholder="Filter by Type"
          styles={colourStylesDark}
          value={colourOptionsDark[typeToColour(providedValue.type)]}
          onChange={(e) => updateTypeDark(e)}
          className="react-select-container"
          classNamePrefix="react-select"
        />
      ) : (
        <Select
          options={colourOptionsLight}
          placeholder="Filter by Type"
          styles={colourStylesLight}
          value={colourOptionsLight[typeToColour(providedValue.type)]}
          onChange={(e) => updateTypeLight(e)}
          className="react-select-container"
          classNamePrefix="react-select"
        />
      )}
    </div>
  );
};

export default Dropdown;
