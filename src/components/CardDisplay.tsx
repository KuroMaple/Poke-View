import React from 'react';
import Card from './Card';

const CardDisplay = () => {
  const cards = Array(5).fill(<Card />);

  return (
    <div className="card-display">
      {cards}
    </div>
  );
};

export default CardDisplay;
