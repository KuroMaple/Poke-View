/* eslint-disable react/jsx-key */
import { useContext, useEffect, useState } from 'react';
import Card from './Card';
import { motion } from 'framer-motion';
import React from 'react';
import { TypeContext } from '../context/typeContext';

const CardDisplay = () => {
  // Contains the selected type to filter by
  const providedValue = useContext(TypeContext);

  // Generates random number between 1 and 500
  //  Cardcount MUST be LESS than 500
  const randomPokemon500 = () => {
    return Math.floor(Math.random() * (500 + 1));
  };

  // Array corresponding to each unique poke ID
  const [uniquePokeIDs, setUniquePokeIDs] = useState<number[]>([]);
  const handleAddCards = () => {
    // eslint-disable-next-line no-constant-condition
    let numFound = false;
    let r = 0;
    while (!numFound) {
      r = randomPokemon500();
      if (uniquePokeIDs.indexOf(r) === -1) {
        numFound = true;
      }
    }
    setUniquePokeIDs((oldArray) => [r, ...oldArray]);
  };

  return (
    <div className="card-display">
      <div className="card-display__button-holder">
        <button
          className="card-display__button"
          onClick={() => {
            handleAddCards();
          }}
        >
          Load More Pok&#233;mon
        </button>
      </div>

      <motion.div
        className="card-display__card-holder"
        initial="initial"
        animate="animate"
      >
        {/* {uniquePokeIDs
          .filter((type) => type === providedValue.type)
          .map((id) => (
            <Card key={id} id={id} />
          ))} */}
        {uniquePokeIDs.map((id) => (
          <Card key={id} id={id} />
        ))}
      </motion.div>
    </div>
  );
};

export default CardDisplay;
