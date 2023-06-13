import React, { useEffect, useState } from 'react';
import { Pokemon } from '../data';

const Card = () => {
  const randomPokemon500 = () => {
    return Math.floor(Math.random() * 500 + 1).toString();
  };

  const [pokemon, setPokemon] = useState<Pokemon>();

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch('https://pokeapi.co/api/v2/pokemon/' + randomPokemon500())
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPokemon({
          name: data.name,
          id: data.id,
          hp: data.stats[0].base_stat,
          atk: data.stats[1].base_stat,
          def: data.stats[2].base_stat,
          front_sprite: data.sprites.front_default,
        });
      });
  }, []);

  return (
    <div className="card">
      <img src={pokemon?.front_sprite} />
      <span>{pokemon?.name}</span>
    </div>
  );
};

export default Card;
