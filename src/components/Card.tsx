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
  onClick: React.Dispatch<React.SetStateAction<null>>;
}

const Card: React.FC<Props> = ({ pkmn }) => {
  // Determines cards Flip status
  const [isFlipped, setIsFlipped] = useState(true);

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

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      onClick={onClick}
    >
      {isFlipped ? (
        <motion.div
          className="card__back"
          variants={FlipVariant}
          initial="initial"
          animate="animate"
        ></motion.div>
      ) : (
        <FrontCard pokemon={pkmn} />
      )}
    </motion.div>
  );
};

export default Card;
