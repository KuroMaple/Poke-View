import React, { useState } from 'react';
import Card from './Card';

const CardDisplay = () => {
  const [cards, setCards] = useState(Array(5).fill(<Card />));

  const handleAddCards = () => {
    const newCard = <Card />;
    setCards([...cards, newCard]);
  };
  return (
    <div className="card-display">
      <div className="card-display__card-holder">{cards}</div>
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
