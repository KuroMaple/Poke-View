/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { Pokemon, pkmnMaxstats } from '../data';
import pokeAPI from '../poke-api';
import FrontCard from './FrontCard';
import { motion } from 'framer-motion';

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

  const flipCard = setTimeout(flipper, 500);

  const FlipVariant = {
    initial: {
      y: '0%',
    },
    animate: {
      rotateY: 90,
      transition: { duration: 0.25 },
    },
  };

  return (
    <div>
      {isFlipped ? (
        <motion.div className="card__back" variants={FlipVariant}></motion.div>
      ) : (
        <FrontCard pokemon={pokemon} />
      )}
    </div>
  );
};

export default Card;
