import React, { useContext, useEffect, useState } from 'react';
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

  const [pokemon, setPokemon] = useState(pkmn);

  useEffect(() => {
    setPokemon(pkmn);
  }, [pokemon]);

  //Removes unwanted escape sequences from api text
  const processText = (text: string) => {
    text = text.replace(/\n|\f/g, ' ');
    return text;
  };

  // Capitalizes the first letter of the first pokemons name
  const capitalizeName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  // returns the color of the passed in type
  const getColor = (type: string) => {
    switch (type) {
      case 'grass':
        return '#56AE56';
        break;
      case 'fire':
        return '#EE8130';
        break;
      case 'water':
        return '#446CB3';
        break;
      case 'bug':
        return '#A6B91A';
        break;
      case 'normal':
        return '#A8A77A';
        break;
      case 'poison':
        return '#A33EA1';
        break;
      case 'electric':
        return '#b5a93f';
        break;
      case 'ground':
        return '#E2BF65';
        break;
      case 'fairy':
        return '#D685AD';
        break;
      case 'fighting':
        return '#C22E28';
        break;
      case 'psychic':
        return '#F95587';
        break;
      case 'rock':
        return '#7D7528';
        break;
      case 'ghost':
        return '#735797';
        break;
      case 'ice':
        return '#96D9D6';
        break;
      case 'dragon':
        return '#6F35FC';
        break;
      case 'steel':
        return '#B7B7CE';
        break;
      case 'flying':
        return '#A98FF3';
        break;
      case 'dark':
        return '#705746';
        break;
    }
  };

  // The Type object that holds my background colors
  interface typeObject {
    firstTypeColor: string;
    secondTypeColor: string;
  }

  // Sets the background based off the pokemons type
  const setBackground = () => {
    const typeColors: typeObject = {
      firstTypeColor: getColor(pkmn.typePrimary) ?? '',
      secondTypeColor: getColor(pkmn.typeSecondary ?? '') ?? '',
    };
    return typeColors;
  };

  // Returns whether pokemon has two types
  const doubleType = () => {
    return pkmn.typeSecondary ? true : false;
  };

  const doubleSet = () => {
    return (
      'linear-gradient(135deg, ' +
      setBackground().firstTypeColor +
      ', ' +
      setBackground().secondTypeColor +
      ')'
    );
  };

  const singleSet = () => {
    return (
      'linear-gradient(135deg, ' +
      setBackground().firstTypeColor +
      ' 80%, ' +
      setBackground().firstTypeColor +
      ' 10%)'
    );
  };
  return (
    <div
      className="focused-view"
      style={{
        background: doubleType() ? doubleSet() : singleSet(),
      }}
    >
      <div className="focused-view__header">
        <div className="focused-view__header-name">
          <p>{capitalizeName(pkmn.name)}</p>
        </div>

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
        <div className="focused-view__stats-single">
          <CardStat
            statName="hp"
            statValue={pkmn?.hp}
            maxStat={pkmnMaxstats.hp}
          />
        </div>

        <div className="focused-view__stats-single">
          <CardStat
            statName="atk"
            statValue={pkmn?.atk}
            maxStat={pkmnMaxstats.atk}
          />
        </div>
        <div className="focused-view__stats-single">
          <CardStat
            statName="def"
            statValue={pkmn?.def}
            maxStat={pkmnMaxstats.def}
          />
        </div>
        <div className="focused-view__stats-single">
          <CardStat
            statName="spatk"
            statValue={pkmn?.spAtk ?? 0}
            maxStat={pkmnMaxstats.spAtk ?? 0}
          />
        </div>
        <div className="focused-view__stats-single">
          <CardStat
            statName="spdef"
            statValue={pkmn?.spDef ?? 0}
            maxStat={pkmnMaxstats.spDef ?? 0}
          />
        </div>
        <div className="focused-view__stats-single">
          <CardStat
            statName="speed"
            statValue={pkmn?.speed ?? 0}
            maxStat={pkmnMaxstats.speed ?? 0}
          />
        </div>
      </div>
      <div className="focused-view__flavor-text">
        <p>{processText(pkmn.flavorText ?? '')}</p>
      </div>
    </div>
  );
};

export default FocusedCard;
