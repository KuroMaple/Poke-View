import './FocusedCard.css';
import React, { useContext, useEffect, useState } from 'react';
import { Pokemon, pkmnMaxstats } from '../../data';
import Types from '../Types';
import { DarkModeContext } from '../../context/DarkModeContext';
import CardStat from '../CardStat';
import MyRadarChart from '../RadarChart/MyRadarChart';
import FocusedStats from './FocusedStat/FocusedStats';

interface Props {
  pkmn: Pokemon;
}

const FocusedCard: React.FC<Props> = ({ pkmn }) => {
  // Dark Mode tracker
  const { isDarkMode } = useContext(DarkModeContext);

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
        return '#458F45';
        break;
      case 'fire':
        return '#B44C18';
        break;
      case 'water':
        return '#446CB3';
        break;
      case 'bug':
        return '#7B8824';
        break;
      case 'normal':
        return '#8C8C6E';
        break;
      case 'poison':
        return '#822E87';
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
        return '#75140f';
        break;
      case 'psychic':
        return '#D3385E';
        break;
      case 'rock':
        return '#7D7528';
        break;
      case 'ghost':
        return '#735797';
        break;
      case 'ice':
        return '#7FA7A5';
        break;
      case 'dragon':
        return '#5930B5';
        break;
      case 'steel':
        return '#8888A9';
        break;
      case 'flying':
        return '#9279D6';
        break;
      case 'dark':
        return '#4D433B';
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
      <div className="focused-view__main-info">
        <div className="focused-view__img-outmoust-border">
          <div className="focused-view__img-inner-border">
            <div className="focused-view__img">
              {isDarkMode ? (
                <img src={pkmn?.animatedShinyFront} className="card__img" />
              ) : (
                <img src={pkmn?.animatedFront} className="card__img" />
              )}
            </div>
          </div>
        </div>
        <div className="radar-chart__container">
          <MyRadarChart pkmn={pkmn} />
        </div>
      </div>
      <FocusedStats
        hp={pkmn.hp}
        atk={pkmn.atk}
        def={pkmn.def}
        spatk={pkmn.spAtk ?? 0}
        spdef={pkmn.spDef ?? 0}
        speed={pkmn.speed ?? 0}
      />
      <div className="focused-view__flavor-text">
        <p>{processText(pkmn.flavorText ?? '')}</p>
      </div>
    </div>
  );
};

export default FocusedCard;
