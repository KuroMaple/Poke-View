import './App.css';
import CardDisplay from './components/CardDisplay';
import FilterBox from './components/FilterBox';
import MainHeader from './components/MainHeader';
import React, { createContext, useState } from 'react';
import { ColourOption, colourOptions } from './data';
import { PokemonType, TypeContext } from './context/typeContext';

function App() {
  // Corresponds to the current filterbox type filters
  const [type, setType] = useState<PokemonType>('all');
  // Object to be passed through context
  const providerValue = {
    type,
    setType,
  };
  return (
    <>
      <TypeContext.Provider value={providerValue}>
        <MainHeader />
        <FilterBox />
        <CardDisplay />
      </TypeContext.Provider>
    </>
  );
}

export default App;
