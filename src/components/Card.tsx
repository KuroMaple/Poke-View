/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useContext, useEffect, useState } from 'react';
import { Pokemon, pkmnMaxstats } from '../data';
import pokeAPI from '../poke-api';
import FrontCard from './FrontCard';
import { AnimatePresence, motion } from 'framer-motion';
import { PokemonContext } from '../context/PokemonContext';
import Modal from './Modal/Modal';

interface Props {
  pkmn: Pokemon;
}

const Card: React.FC<Props> = ({ pkmn }) => {
  // State that holds all the pokemon Data information
  const [pokemon, setPokemon] = useState<Pokemon>(pkmnMaxstats);
  // Determines cards Flip status
  const [isFlipped, setIsFlipped] = useState(true);

  useEffect(() => {
    setPokemon(pkmn);
  }, []);

  const flipper = () => {
    setIsFlipped(false);
  };

  const flipCard = setTimeout(flipper, 700);

  const FlipVariant = {
    initial: {
      rotateY: 0,
      transition: { duration: 0.25 },
    },
    animate: {
      rotateY: 90,
      transition: { duration: 0.5 },
    },
  };
  // Pokemon array and all operations on array
  const { modalOpen, setModalOpen } = useContext(PokemonContext);

  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      onClick={() => {
        modalOpen ? closeModal() : openModal();
      }}
    >
      <AnimatePresence
        // Disable any initial animations on children that
        // are present when the component is first rendered
        initial={false}
        // Only render one component at a time.
        // The exiting component will finish its exit
        // animation before entering component is rendered
        mode="wait"
        // Fires when all exiting nodes have completed animating out
        onExitComplete={() => null}
      >
        {modalOpen && (
          <Modal modalOpen={modalOpen} handleClose={closeModal} text="hi" />
        )}
      </AnimatePresence>
      {isFlipped ? (
        <motion.div
          className="card__back"
          variants={FlipVariant}
          initial="initial"
          animate="animate"
        ></motion.div>
      ) : (
        <FrontCard pokemon={pokemon} />
      )}
    </motion.div>
  );
};

export default Card;
