/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { Pokemon, pkmnMaxstats } from '../data';
import Types from './Types';
import CardStat from './CardStat';
import pokeAPI from '../poke-api';
import ReactCardFlip from 'react-card-flip';

interface Props {
  id: number;
}

const Card: React.FC<Props> = ({ id }) => {
  // State that holds all the pokemon Data information
  const [pokemon, setPokemon] = useState<Pokemon>(pkmnMaxstats);
  // Determines cards Flip status
  const [isFlipped, setIsFlipped] = useState(true);

  const randomPokemon500 = () => {
    return Math.floor(Math.random() * 500 + 1).toString();
  };

  const capitalizeName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const processText = (text: string) => {
    text = text.replace(/\n|\f/g, ' ');
    return text;
  };

  // handles Card flipping
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFlipped((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = pokeAPI;
        const pokemonData = await api.getPokemon(randomPokemon500()); //API calls
        const speciesData = await api.getSpecies(pokemonData.id);
        console.log(speciesData);
        // Process the fetched data
        const pkmnData: Pokemon = {
          name: pokemonData.name,
          id: pokemonData.id,
          hp: pokemonData.stats[0].base_stat,
          atk: pokemonData.stats[1].base_stat,
          def: pokemonData.stats[2].base_stat,
          front_sprite: pokemonData.sprites.front_default,
          typePrimary: pokemonData.types[0].type.name,
        };

        if (pokemonData.types.length === 2) {
          pkmnData.typeSecondary = pokemonData.types[1].type.name;
        }

        // Parse through flavor text until english flavor is found
        let counter = -1;
        let flavorText = '';
        do {
          ++counter;
          flavorText = speciesData.flavor_text_entries[counter].flavor_text;
        } while (
          speciesData.flavor_text_entries[counter].language.name !== 'en' //control language from here
        );

        setPokemon((prevState) => ({
          ...prevState,
          ...pkmnData,
          flavorText,
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div className="card" onClick={handleClick}>
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
        <div className="card__img">
          <img src={pokemon?.front_sprite} />
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

      <div className="card__back" onClick={handleClick}></div>
    </ReactCardFlip>
  );
};

export default Card;
