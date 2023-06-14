/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { Pokemon } from '../data';
import Types from './Types';

const Card = () => {
  const randomPokemon500 = () => {
    return Math.floor(Math.random() * 500 + 1).toString();
  };

  const capitalizeName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const [pokemon, setPokemon] = useState<Pokemon>();

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch('https://pokeapi.co/api/v2/pokemon/' + randomPokemon500())
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const pkmnData: Pokemon = {
          name: data.name,
          id: data.id,
          hp: data.stats[0].base_stat,
          atk: data.stats[1].base_stat,
          def: data.stats[2].base_stat,
          front_sprite: data.sprites.front_default,
          typePrimary: data.types[0].type.name,
        };

        if (data.types.length === 2) {
          pkmnData.typeSecondary = data.types[1].type.name;
        }

        setPokemon(pkmnData);
      });
  }, []);

  return (
    <div className="card">
      <div className="card__header">
        <p className="card__header__name">
          {capitalizeName(pokemon?.name ?? '')}
        </p>
        <Types
          typePrimary={pokemon?.typePrimary ?? ''}
          typeSecondary={pokemon?.typeSecondary ?? ''}
        />
      </div>
      <div className="card__img-border">
        <div className="card__img">
          <img src={pokemon?.front_sprite} />
        </div>
      </div>
      <p> hp: {pokemon?.hp}</p>
      <p> atk: {pokemon?.atk}</p>
      <p> def: {pokemon?.def}</p>
    </div>
  );
};

export default Card;
