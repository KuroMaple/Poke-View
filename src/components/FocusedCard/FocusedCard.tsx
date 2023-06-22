import React, { useContext } from 'react';
import { Pokemon, pkmnMaxstats } from '../../data';
import Types from '../Types';
import { DarkModeContext } from '../../context/DarkModeContext';
import CardStat from '../CardStat';

interface Props {
  pkmn: Pokemon;
}

const FocusedCard: React.FC<Props> = ({ pkmn }) => {
  // Dark Mode tracker
  const { isDarkMode, setDarkMode } = useContext(DarkModeContext);

  //Removes unwanted escape sequences from api text
  const processText = (text: string) => {
    text = text.replace(/\n|\f/g, ' ');
    return text;
  };

  const capitalizeName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div className="focused-view">
      <div className="focused-view__header">
        <p>{capitalizeName(pkmn.name)}</p>
        <div className="focused-view__header-types">
          <Types
            typePrimary={pkmn.typePrimary}
            typeSecondary={pkmn?.typeSecondary ?? ''}
          />
        </div>
      </div>
      <div className="focused-view__img">
        {isDarkMode ? (
          <img src={pkmn?.front_shiny} className="card__img" />
        ) : (
          <img src={pkmn?.front_sprite} className="card__img" />
        )}
      </div>
      <div className="focused-view__stats">
        <CardStat
          statName="hp"
          statValue={pkmn?.hp}
          maxStat={pkmnMaxstats.hp}
        />
        <CardStat
          statName="atk"
          statValue={pkmn?.atk}
          maxStat={pkmnMaxstats.atk}
        />
        <CardStat
          statName="def"
          statValue={pkmn?.def}
          maxStat={pkmnMaxstats.def}
        />
        <CardStat
          statName="spatk"
          statValue={pkmn?.spAtk ?? 0}
          maxStat={pkmnMaxstats.spAtk ?? 0}
        />
        <CardStat
          statName="spdef"
          statValue={pkmn?.spDef ?? 0}
          maxStat={pkmnMaxstats.spDef ?? 0}
        />
        <CardStat
          statName="speed"
          statValue={pkmn?.speed ?? 0}
          maxStat={pkmnMaxstats.speed ?? 0}
        />
      </div>
      <div className="focused-view__flavor-text">
        <p>{processText(pkmn.flavorText ?? '')}</p>
      </div>
    </div>
  );
};

export default FocusedCard;
