import React, { useContext } from 'react';
import { Pokemon, pkmnMaxstats } from '../data';
import CardStat from './CardStat';
import Types from './Types';
import { motion } from 'framer-motion';
import { DarkModeContext } from '../context/DarkModeContext';

interface Props {
  pokemon: Pokemon;
}

const FrontCard: React.FC<Props> = ({ pokemon }) => {
  // Dark Mode tracker
  const { isDarkMode, setDarkMode } = useContext(DarkModeContext);

  const capitalizeName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const processText = (text: string) => {
    text = text.replace(/\n|\f/g, ' ');
    return text;
  };

  const FlipVariant = {
    initial: {
      rotateY: 90,
    },
    animate: {
      rotateY: 0,
      transition: { duration: 0.25 },
    },
  };

  return (
    <motion.div variants={FlipVariant} whileHover={{ scale: 1.1 }}>
      <div className="card">
        <div className="card__header">
          <div className="card__id">
            <p>{pokemon?.id}.</p>
          </div>
          <p className="card__header__name">{capitalizeName(pokemon.name)}</p>
          <Types
            typePrimary={pokemon.typePrimary}
            typeSecondary={pokemon?.typeSecondary ?? ''}
          />
        </div>
        <div className="outerBorderTwo">
          <div className="outerBorderOne">
            <div className="card__img-container">
              {isDarkMode ? (
                <img src={pokemon?.front_shiny} className="card__img" />
              ) : (
                <img src={pokemon?.front_sprite} className="card__img" />
              )}
            </div>
          </div>
        </div>

        <div className="card__stats">
          <CardStat
            statName="hp"
            statValue={pokemon?.hp}
            maxStat={pkmnMaxstats.hp}
          />
          <CardStat
            statName="atk"
            statValue={pokemon?.atk}
            maxStat={pkmnMaxstats.atk}
          />
          <CardStat
            statName="def"
            statValue={pokemon?.def}
            maxStat={pkmnMaxstats.def}
          />
        </div>
        <div className="card__flavor-text">
          <p>{processText(pokemon.flavorText ?? '')}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default FrontCard;
