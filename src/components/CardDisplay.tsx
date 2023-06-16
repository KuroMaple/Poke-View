/* eslint-disable react/jsx-key */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Card from './Card';
import { Pokemon } from '../data';
import { render } from 'react-dom';

const CardDisplay = () => {
  const handleAddCards = () => {
    const goalLength = uniqueIDs.length + 1;

    while (uniqueIDs.length < goalLength) {
      const r = Math.floor(Math.random() * 500 + 1);
      if (uniqueIDs.indexOf(r) === -1) {
        console.log('unique id: ' + r);
        setUniqueIDs([...uniqueIDs, r]);
        break;
      }
    }
  };

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
  const [uniqueIDs, setUniqueIDs] = useState<number[]>(randomPokemon500(7));

  useEffect(() => {
    console.log('card Display use effect');
  }, []);

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
      <div className="card-display__card-holder">
        {uniqueIDs.map((id) => (
          <Card id={id} />
        ))}
      </div>
    </div>
  );
};

export default CardDisplay;
