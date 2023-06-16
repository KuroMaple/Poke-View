/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import Card from './Card';
import { Pokemon } from '../data';

const CardDisplay = () => {
  const [cards, setCards] = useState<React.ReactNode[]>([]);

  const [idTracker, setIdTracker] = useState<number[]>([]);

  const handleAddCards = () => {
    const id = randomPokemon500();
    setIdTracker([...idTracker, id]);
    const newCard = <Card id={id} />;
    setCards([...cards, newCard]);
  };

  const randomPokemon500 = () => {
    return Math.floor(Math.random() * 500 + 1);
  };

  const add7 = () => {
    for (let i = 0; i < 7; i++) {
      console.log('added ' + i + ' times');
      handleAddCards();
    }
  };

  useEffect(() => {
    add7();
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
      {cards}
      </div>
    </div>
  );
};

export default CardDisplay;
