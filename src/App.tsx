import './App.css';
import CardDisplay from './components/CardDisplay';
import FilterBox from './components/FilterBox';
import MainHeader from './components/MainHeader';
import React, { useState, useRef } from 'react';
import { Pokemon, maxPokemonCount } from './data';
import { PokemonType, TypeContext } from './context/typeContext';
import { PokemonContext, generatePokemon } from './context/PokemonContext';
import { DarkModeContext } from './context/DarkModeContext';

function App() {
  // Corresponds to the current filterbox type filters
  const [type, setType] = useState<PokemonType>('all');

  // Object to be passed through context
  const providerValue = {
    type,
    setType,
  };
  // All collected Pokémon cards
  const [pokemonCards, setPokemonCards] = useState<Pokemon[]>([]);

  // Dex IDs not yet collected. A ref, not state: we mutate it synchronously at
  // click time to reserve an ID before its async fetch resolves, which is what
  // stops two fast clicks from picking the same one.
  const availableIdsRef = useRef<Set<number>>();
  if (!availableIdsRef.current) {
    availableIdsRef.current = new Set(
      Array.from({ length: maxPokemonCount }, (_, i) => i + 1)
    );
  }
  const availableIds = availableIdsRef.current;

  // Error snackbar state
  const [snackOpen, setSnackOpen] = useState(false);
  // Snackbar variant
  const [variant, setVariant] = useState('');

  // Pkmn card focused view Modal state
  const [modalOpen, setModalOpen] = useState(false);

  //The state to track whether dark mode is active
  const [isDarkMode, setDarkMode] = React.useState(false);

  // The provider value for my apps dark mode
  const darkModeProvider = {
    isDarkMode,
    setDarkMode,
  };

  // True if no already-collected card shares this name.
  const isNameUnique = (name: string): boolean =>
    !pokemonCards.some((curPkmn) => curPkmn.name === name);

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

  // Snackbar fetch/network error (a generatePokemon call rejected)
  const handleFetchError = () => {
    setVariant('FetchError');
    setSnackOpen(true);
  };

  // Single commit point for both add paths: drop the ID from the pool and skip
  // if it's somehow already collected.
  const addPokemon = (newPkmn: Pokemon) => {
    availableIds.delete(newPkmn.id);
    setPokemonCards((oldArray) =>
      oldArray.some((curPkmn) => curPkmn.id === newPkmn.id)
        ? oldArray
        : [newPkmn, ...oldArray]
    );
  };

  // Pick a random ID from the remaining pool and reserve it before fetching.
  const handleAddRandomCard = () => {
    if (availableIds.size === 0) {
      handleMaxPkmnReached();
      return;
    }
    const ids = Array.from(availableIds);
    const id = ids[Math.floor(Math.random() * ids.length)];
    availableIds.delete(id); // reserve synchronously → no double-pick race
    generatePokemon(id)
      .then(addPokemon)
      .catch(() => {
        availableIds.add(id); // fetch failed — let this ID be rolled again
        handleFetchError();
      });
  };

  // Adds a pokemon by name only if it is not already collected.
  const handleAddCardByName = (name: string) => {
    if (isNameUnique(name)) {
      generatePokemon(name)
        .then(addPokemon)
        .catch(() => handleFetchError());
    } else if (availableIds.size === 0) {
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
    modalOpen,
    setModalOpen,
  };

  return (
    <TypeContext.Provider value={providerValue}>
      <DarkModeContext.Provider value={darkModeProvider}>
        <MainHeader />
        <PokemonContext.Provider value={pkmnProvider}>
          <FilterBox />
          <CardDisplay />
        </PokemonContext.Provider>
      </DarkModeContext.Provider>
    </TypeContext.Provider>
  );
}

export default App;
