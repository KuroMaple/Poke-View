/* eslint-disable react/jsx-key */
import { useContext, useState } from 'react';
import Card from './Card';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { TypeContext } from '../context/typeContext';
import SnackBar from './SnackBar';
import { PokemonContext } from '../context/PokemonContext';
import React from 'react';
import { DarkModeContext } from '../context/DarkModeContext';
import Modal from './Modal/Modal';

const CardDisplay = () => {
  // Contains the selected type to filter by
  const providedValue = useContext(TypeContext);

  // Pokemon array and all operations on array
  const pokemonProvided = useContext(PokemonContext);

  const [focusedPokemon, setFocusedPokemon] = useState(null);

  // Evaluates whether currentPkmn type matches drop down selected type
  const typeDisplay = (
    currentPrimaryType: string,
    currentSecondaryType: string | undefined
  ) => {
    if (providedValue.type === 'all') {
      return true;
    } else {
      return (
        currentPrimaryType === providedValue.type ||
        currentSecondaryType === providedValue.type
      );
    }
  };

  // const onClickCard = (pkmn: any) => {
  //   modalOpen ? closeModal() : openModal();
  //   setFocusedPokemon(pkmn);
  // };

  const ContainerVariants = {
    initial: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="card-display">
      <div className="card-display__button-holder">
        <button
          className="card-display__button"
          onClick={() => {
            pokemonProvided.handleAddRandomCard();
          }}
        >
          Load More Pok&#233;mon
        </button>
      </div>

      <SnackBar
        snackOpen={pokemonProvided.snackOpen}
        setSnackOpen={pokemonProvided.setSnackOpen}
        variant={pokemonProvided.variant}
      />

      <motion.div className="card-display__card-holder">
        {pokemonProvided.pokemonCards
          .filter((curPkmn) =>
            typeDisplay(curPkmn.typePrimary, curPkmn.typeSecondary)
          )
          .map((curPkmn) => (
            <Card
              key={curPkmn.id}
              pkmn={curPkmn}
              //onClick={() => onClickCard(curPkmn)}
            />
          ))}
      </motion.div>
    </div>
  );
};

export default CardDisplay;
