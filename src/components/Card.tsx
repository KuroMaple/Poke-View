/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { Pokemon, pkmnMaxstats } from '../data';
import pokeAPI from '../poke-api';
import FrontCard from './FrontCard';
import { motion } from 'framer-motion';

interface Props {
  pkmn: Pokemon;
}

const Card: React.FC<Props> = ({ pkmn }) => {
  // State that holds all the pokemon Data information
  const [pokemon, setPokemon] = useState<Pokemon>(pkmnMaxstats);
  // Determines cards Flip status
  const [isFlipped, setIsFlipped] = useState(true);

  useEffect(() => {
    // const fetchData = async () => {
    //   const api = pokeAPI;
    //   const pokemonData = await api.getPokemon(id); //API calls
    //   const speciesData = await api.getSpecies(id);
    //   // Process the fetched data
    //   const pkmnData: Pokemon = {
    //     name: pokemonData.name,
    //     id: pokemonData.id,
    //     hp: pokemonData.stats[0].base_stat,
    //     atk: pokemonData.stats[1].base_stat,
    //     def: pokemonData.stats[2].base_stat,
    //     front_sprite: pokemonData.sprites.front_default,
    //     typePrimary: pokemonData.types[0].type.name,
    //   };

    //   if (pokemonData.types.length === 2) {
    //     pkmnData.typeSecondary = pokemonData.types[1].type.name;
    //   }

    //   // Parse through flavor text until english flavor is found
    //   let counter = -1;
    //   let flavorText = '';
    //   do {
    //     ++counter;
    //     flavorText = speciesData.flavor_text_entries[counter].flavor_text;
    //   } while (
    //     speciesData.flavor_text_entries[counter].language.name !== 'en' //control language from here
    //   );

    //   setPokemon((prevState) => ({
    //     ...prevState,
    //     ...pkmnData,
    //     flavorText,
    //   }));
    // };
    // fetchData();
    setPokemon(pkmn);
  }, []);

  const flipper = () => {
    setIsFlipped(false);
  };

  const flipCard = setTimeout(flipper, 1500);

  const FlipVariant = {
    initial: {
      y: '0%',
    },
    animate: {
      rotateY: 90,
      transition: { duration: 1 },
    },
  };

  return (
    <div>
      {isFlipped ? (
        <motion.div className="card__back" variants={FlipVariant}></motion.div>
      ) : (
        <FrontCard pokemon={pokemon} />
      )}
    </div>
  );
};

export default Card;
