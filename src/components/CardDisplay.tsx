/* eslint-disable react/jsx-key */
import { useState } from 'react';
import Card from './Card';
import { motion } from 'framer-motion';
import React from 'react';

const CardDisplay = () => {
  // Generates an array of size cardCount unique random numbers from 500 pokemon list
  //  Cardcount MUST be LESS than 500
  const randomPokemon500 = (cardCount: number) => {
    const rands: number[] = [];
    if (cardCount > 500) {
      throw console.error('Card Count MUST BE LESS than 500');
    }

    while (rands.length < cardCount) {
      const r = Math.floor(Math.random() * 500 + 1);
      if (rands.indexOf(r) === -1) {
        rands.push(r);
      }
    }
    return rands;
  };

  // Used to ensure unique id's
  const [uniqueIDs, setUniqueIDs] = useState<number[]>(randomPokemon500(6));

  const handleAddCards = () => {
    const goalLength = uniqueIDs.length + 1;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const r = Math.floor(Math.random() * 500 + 1);
      if (uniqueIDs.indexOf(r) === -1) {
        setUniqueIDs((current) => [...current, r]); // TO DO: ADD new pokemon to front of array not back
        console.log(uniqueIDs);
        break;
      }
    }
  };

  return (
    <div className="card-display">
      <button
        className="card-display__button"
        onClick={() => {
          handleAddCards();
        }}
      >
        Load More Pok&#233;mon
      </button>
      <motion.div
        className="card-display__card-holder"
        initial="initial"
        animate="animate"
      >
        {uniqueIDs.map((id) => (
          <Card id={id} />
        ))}
      </motion.div>
    </div>
  );
};

export default CardDisplay;
