import './App.css';
import CardDisplay from './components/CardDisplay';
import FilterBox from './components/FilterBox';
import MainHeader from './components/MainHeader';
import React, { useEffect, useState } from 'react';
import { Pokemon, maxPokemonCount } from './data';
import { PokemonType, TypeContext } from './context/typeContext';
import {
  PokemonContext,
  generatePokemon,
  randomPokemon500,
} from './context/PokemonContext';
import { DarkModeContext } from './context/DarkModeContext';
import { Steps } from 'intro.js-react';
import 'intro.js/introjs.css';

function App() {
  // Intro.js steps
  const [stepsEnabled, setStepsEnabled] = useState(true);
  const [stepsOneCardEnabled, setStepsOneCardEnabled] = useState(false);
  const [stepsTwoCardEnabled, setStepsTwoCardEnabled] = useState(false);
  const [secondLoad, setSecondLoad] = useState(false);
  const steps = [
    {
      element: 'doesnotexist',
      intro:
        'Welcome to PokéView! This is a quick guide to help you get started.',
      position: 'right',
    },
    {
      element: '.main-header__title',
      intro:
        'PokéView allows you to learn about different Pokémon in the form of collectible cards.',
    },
    {
      element: '.card-display__button',
      intro:
        'You can add a random Pokémon to your collection by clicking the "Load More Pokémon" button.',
    },
  ];

  const stepsOneCard = [
    {
      element: '#whole-card',
      intro: 'A wild Pokémon card appears! Click on the card to learn more.',
      position: 'right',
    },
  ];

  const stepsSecondLoad = [
    {
      element: '.card-display__button',
      intro:
        'Nice! Now try loading another Pokémon by clicking the "Load More Pokémon" button.',
    },
  ];

  const stepsTwoCard = [
    {
      element: '.filter-box__dropdown',
      intro: 'Filter Pokémon by type using the type dropdown.',
    },
    {
      element: '.filter-box__input-box__input',
      intro: 'Search for Pokémon by name using the search bar.',
    },
    {
      element: '.main-header__button',
      intro: 'Toggle dark mode by clicking here for a shiny surprise.',
    },
    {
      element: '.card-display__card-holder',
      intro: 'Thats it! Enjoy your Pokémon journey!',
      position: 'auto',
    },
  ];

  useEffect(() => {
    if (!stepsOneCardEnabled) {
      setSecondLoad(true);
    }
  }, [stepsOneCardEnabled]);

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

  // Pkmn card focused view Modal state
  const [modalOpen, setModalOpen] = useState(false);

  //The state to track whether dark mode is active
  const [isDarkMode, setDarkMode] = React.useState(false);

  // The provider value for my apps dark mode
  const darkModeProvider = {
    isDarkMode,
    setDarkMode,
  };

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
    modalOpen,
    setModalOpen,
  };

  const onExit = () => {
    setStepsEnabled(false);
  };

  const onExitOneCard = () => {
    setStepsOneCardEnabled(false);
  };

  const onExitTwoCard = () => {
    setStepsTwoCardEnabled(false);
  };

  const onExitSecondLoad = () => {
    setSecondLoad(false);
  };

  return (
    <>
      <Steps
        enabled={stepsEnabled}
        steps={steps}
        initialStep={0}
        onExit={() => onExit()}
      />
      {pokemonCards.length === 1 && !modalOpen ? (
        <Steps
          enabled={stepsOneCardEnabled}
          steps={stepsOneCard}
          initialStep={0}
          onExit={() => onExitOneCard()}
        />
      ) : null}
      {secondLoad && !modalOpen ? (
        <Steps
          enabled={secondLoad}
          steps={stepsSecondLoad}
          initialStep={0}
          onExit={() => onExitSecondLoad()}
        />
      ) : null}
      {pokemonCards.length === 2 && !modalOpen ? (
        <Steps
          enabled={stepsTwoCardEnabled}
          steps={stepsTwoCard}
          initialStep={0}
          onExit={() => onExitTwoCard()}
        />
      ) : null}
      <TypeContext.Provider value={providerValue}>
        <DarkModeContext.Provider value={darkModeProvider}>
          <MainHeader />
          <PokemonContext.Provider value={pkmnProvider}>
            <FilterBox />
            <CardDisplay />
          </PokemonContext.Provider>
        </DarkModeContext.Provider>
      </TypeContext.Provider>
    </>
  );
}

export default App;
