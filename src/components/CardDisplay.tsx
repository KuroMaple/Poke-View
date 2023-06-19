/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react';
import Card from './Card';
import { motion } from 'framer-motion';
import React from 'react';

const CardDisplay = () => {
  // Generates random number between 1 and 500
  //  Cardcount MUST be LESS than 500
  const randomPokemon500 = () => {
    return Math.floor(Math.random() * (500 + 1));
  };

  // Used to ensure unique id's
  const [uniqueIDs, setUniqueIDs] = useState<number[]>([]);

  const handleAddCards = () => {
    // eslint-disable-next-line no-constant-condition
    let numFound = false;
    let r = 0;
    while (!numFound) {
      r = randomPokemon500();
      if (uniqueIDs.indexOf(r) === -1) {
        console.log('unique id: ' + r);
        numFound = true;
      }
    }
    setUniqueIDs((current) => [...current, r]); // TO DO: ADD new pokemon to front of array not back
  };

  useEffect(() => {
    
  }, []);

  return (
    <div className="card-display">
      <motion.div
        className="card-display__card-holder"
        initial="initial"
        animate="animate"
      >
        {uniqueIDs.map((id) => (
          <Card id={id} />
        ))}
      </motion.div>
      <button
        className="card-display__button"
        onClick={() => {
          handleAddCards();
        }}
      >
        Load More Pok&#233;mon
      </button>
    </div>
  );
};

export default CardDisplay;
