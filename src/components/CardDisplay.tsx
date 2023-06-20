/* eslint-disable react/jsx-key */
import { useContext, useEffect, useState } from 'react';
import Card from './Card';
import { motion } from 'framer-motion';
import React from 'react';
import { TypeContext } from '../context/typeContext';
import { Pokemon } from '../data';
import pokeAPI from '../poke-api';

const CardDisplay = () => {
  // Contains the selected type to filter by
  const providedValue = useContext(TypeContext);

  // Generates random number between 1 and 500
  //  Cardcount MUST be LESS than 500
  const randomPokemon500 = () => {
    return Math.floor(Math.random() * (500 + 1));
  };

  // Array corresponding to each unique poke ID
  const [uniquePokeIDs, setUniquePokeIDs] = useState<number[]>([]);

  // State that holds all the pokemon Data information
  const [pokemonCards, setPokemonCards] = useState<Pokemon[]>([]);

  const generatePokemon = async (id: number): Promise<Pokemon> => {
    const api = pokeAPI;
    const pokemonData = await api.getPokemon(id); //API calls
    const speciesData = await api.getSpecies(id);
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
    pkmnData.flavorText = flavorText;
    return pkmnData;
  };

  // Checks the unqiuness of the passed id
  const isUnique = (id: number): boolean => {
    pokemonCards.forEach((curPkmn) => {
      if (curPkmn.id === id) {
        return false;
      }
    });

    return true;
  };

  // Generates a unique ID, makes the API calls and adds to the Pokemon Array
  const handleAddCards = () => {
    // eslint-disable-next-line no-constant-condition
    let numFound = false;
    let r = 0;
    while (!numFound) {
      r = randomPokemon500();
      if (isUnique(r)) {
        numFound = true;
      }
    }
    generatePokemon(r).then((newPkmn) => {
      setPokemonCards((oldArray) => [newPkmn, ...oldArray]);
    });
    console.log(pokemonCards);
  };

  // Evaluates whether currentPkmn type matches drop down selected type
  const typeDisplay = (
    currentPrimaryType: string,
    currentSecondaryType: string | undefined
  ) => {
    if (providedValue.type === 'all') {
      return true;
    } else {
      return (
        currentPrimaryType === providedValue.type ||
        currentSecondaryType === providedValue.type
      );
    }
  };

  return (
    <div className="card-display">
      <div className="card-display__button-holder">
        <button
          className="card-display__button"
          onClick={() => {
            handleAddCards();
          }}
        >
          Load More Pok&#233;mon
        </button>
      </div>

      <motion.div
        className="card-display__card-holder"
        initial="initial"
        animate="animate"
      >
        {pokemonCards
          .filter((curPkmn) =>
            typeDisplay(curPkmn.typePrimary, curPkmn.typeSecondary)
          )
          .map((curPkmn) => (
            <Card key={curPkmn.id} pkmn={curPkmn} />
          ))}
        {/* {uniquePokeIDs.map((id) => (
          <Card key={id} id={id} />
        ))} */}
      </motion.div>
    </div>
  );
};

export default CardDisplay;
