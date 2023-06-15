/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { Pokemon, pkmnMaxstats } from '../data';
import Types from './Types';
import CardStat from './CardStat';

const Card = () => {
  const randomPokemon500 = () => {
    return Math.floor(Math.random() * 500 + 1).toString();
  };

  const capitalizeName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const [pokemon, setPokemon] = useState<Pokemon>(pkmnMaxstats);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemonResponse = await fetch(
          'https://pokeapi.co/api/v2/pokemon/' + randomPokemon500()
        );

        const pokemonData = await pokemonResponse.json();

        // Fetch species data
        const speciesResponse = await fetch(
          'https://pokeapi.co/api/v2/pokemon-species/' + pokemonData.id
        );

        const speciesData = await speciesResponse.json();
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

        const flavorText = speciesData.flavor_text_entries[1].flavor_text;

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
        <span>{pokemon.flavorText}</span>
      </div>
    </div>
  );
};

export default Card;
