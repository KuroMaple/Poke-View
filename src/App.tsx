import './App.css';
import CardDisplay from './components/CardDisplay';
import FilterBox from './components/FilterBox';
import MainHeader from './components/MainHeader';
import React, { useState } from 'react';
import { Pokemon, maxPokemonCount } from './data';
import { PokemonType, TypeContext } from './context/typeContext';
import {
  PokemonContext,
  generatePokemon,
  randomPokemon500,
} from './context/PokemonContext';

function App() {
  // Corresponds to the current filterbox type filters
  const [type, setType] = useState<PokemonType>('all');

  // Object to be passed through context
  const providerValue = {
    type,
    setType,
  };

  // State that holds all the pokemon Data information
  const [pokemonCards, setPokemonCards] = useState<Pokemon[]>([]);
  // Corresponds to the Error snack bar
  const [snackOpen, setSnackOpen] = useState(false);
  // Snackbar variant
  const [variant, setVariant] = useState('');

  // Checks the unqiuness of the passed id, based on if its a name or number
  const isUnique = (id: number | string): boolean => {
    let unique = true;
    if (typeof id === 'number') {
      pokemonCards.map((curPkmn) => {
        if (curPkmn.id === id) {
          unique = false;
        }
      });
    } else {
      pokemonCards.map((curPkmn) => {
        if (curPkmn.name === id) {
          unique = false;
        }
      });
    }

    return unique;
  };

  // Snackbar Max pokemon reached error
  const handleMaxPkmnReached = () => {
    setVariant('MaxPkmn');
    setSnackOpen(true);
  };

  // Snackbar Duplicate pokemon error
  const handleDplctePkmn = () => {
    setVariant('DplctePkmn');
    setSnackOpen(true);
  };

  // Generates a unique ID, makes the API calls and adds to the Pokemon Array
  const handleAddRandomCard = () => {
    // eslint-disable-next-line no-constant-condition
    let numFound = false;
    let r = 0;
    while (!numFound) {
      r = randomPokemon500();
      if (isUnique(r)) {
        numFound = true;
        console.log('unique id: ' + r);
        generatePokemon(r).then((newPkmn) => {
          setPokemonCards((oldArray) => [newPkmn, ...oldArray]);
        });
      } else if (pokemonCards.length === maxPokemonCount) {
        handleMaxPkmnReached();
        break;
      }
    }
  };

  // Adds a pokemon by name only if it does not exist in array already
  const handleAddCardByName = (name: string) => {
    if (isUnique(name)) {
      generatePokemon(name).then((newPkmn) => {
        setPokemonCards((oldArray) => [newPkmn, ...oldArray]);
      });
    } else if (pokemonCards.length === maxPokemonCount) {
      handleMaxPkmnReached();
    } else {
      handleDplctePkmn();
    }
  };

  const pkmnProvider = {
    pokemonCards,
    setPokemonCards,
    handleAddRandomCard,
    snackOpen,
    setSnackOpen,
    handleAddCardByName,
    variant,
    setVariant,
  };

  return (
    <>
      <TypeContext.Provider value={providerValue}>
        <MainHeader />
        <PokemonContext.Provider value={pkmnProvider}>
          <FilterBox />
          <CardDisplay />
        </PokemonContext.Provider>
      </TypeContext.Provider>
    </>
  );
}

export default App;
