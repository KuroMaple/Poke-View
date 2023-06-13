import './App.css';
import CardDisplay from './components/CardDisplay';
import FilterBox from './components/FilterBox';
import MainHeader from './components/MainHeader';
import React from 'react';

function App() {
  return (
    <>
      <MainHeader />
      <FilterBox />
      <CardDisplay />
    </>
  );
}

export default App;
