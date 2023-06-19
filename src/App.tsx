import './App.css';
import CardDisplay from './components/CardDisplay';
import FilterBox from './components/FilterBox';
import MainHeader from './components/MainHeader';
import React, { createContext, useState } from 'react';
import { ColourOption, colourOptions } from './data';
import { PokemonContext, PokemonContextValue } from './context/typeContext';

function App() {
  // Corresponds to the current filterbox type filters
  const pokemonContextValue: PokemonContextValue = {
    value: 'all',
    label: 'All Types',
    color: '#808080',
    setType: (newType: ColourOption) => setType(newType),
  };
  const [type, setType] = useState(pokemonContextValue);
  // Updates the type when User filters by type
  return (
    <>
      <PokemonContext.Provider value={type}>
        <MainHeader />
        <FilterBox />
        <CardDisplay />
      </PokemonContext.Provider>
    </>
  );
}

export default App;
