import React from 'react';

interface Props {
  typePrimary: string;
  typeSecondary: string;
}
const Types: React.FC<Props> = ({ typePrimary, typeSecondary }) => {
  return (
    <div className="card__header__types">
      <p className={typePrimary}>{typePrimary.toUpperCase()}</p>
      <p className={typeSecondary}>{typeSecondary.toUpperCase()}</p>
    </div>
  );
};

export default Types;
