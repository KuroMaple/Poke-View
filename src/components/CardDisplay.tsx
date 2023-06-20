/* eslint-disable react/jsx-key */
import { useContext, useEffect, useState } from 'react';
import Card from './Card';
import { motion } from 'framer-motion';
import React from 'react';
import { TypeContext } from '../context/typeContext';
import { Pokemon, maxPokemonCount } from '../data';
import pokeAPI from '../poke-api';
import SnackBar from './SnackBar';
import { PokemonContext } from '../context/PokemonContext';

const CardDisplay = () => {
  // Corresponds to the Error snack bar
  // const [snackOpen, setSnackOpen] = useState(false);

  // Contains the selected type to filter by
  const providedValue = useContext(TypeContext);

  // Pokemon array and all operations on array
  const pokemonProvided = useContext(PokemonContext);

  // // Generates random number between 1 and 500
  // const randomPokemon500 = () => {
  //   return Math.floor(Math.random() * maxPokemonCount) + 1;
  // };

  // // State that holds all the pokemon Data information
  // const [pokemonCards, setPokemonCards] = useState<Pokemon[]>([]);

  // const generatePokemon = async (id: number): Promise<Pokemon> => {
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
  //   pkmnData.flavorText = flavorText;
  //   return pkmnData;
  // };

  // // Checks the unqiuness of the passed id
  // const isUnique = (id: number): boolean => {
  //   let unique = true;
  //   pokemonCards.map((curPkmn) => {
  //     console.log('curPkmn id: ' + curPkmn.id + ' checking id: ' + id);
  //     if (curPkmn.id === id) {
  //       unique = false;
  //     }
  //   });
  //   return unique;
  // };

  // // outputs snackbar error to user
  // const handleMaxPkmnReached = () => {
  //   setSnackOpen(true);
  // };

  // // Generates a unique ID, makes the API calls and adds to the Pokemon Array
  // const handleAddRandomCard = () => {
  //   // eslint-disable-next-line no-constant-condition
  //   let numFound = false;
  //   let r = 0;
  //   while (!numFound) {
  //     r = randomPokemon500();
  //     if (isUnique(r)) {
  //       numFound = true;
  //       console.log('unique id: ' + r);
  //       generatePokemon(r).then((newPkmn) => {
  //         setPokemonCards((oldArray) => [newPkmn, ...oldArray]);
  //       });
  //     } else if (pokemonCards.length === maxPokemonCount) {
  //       handleMaxPkmnReached();
  //       break;
  //     }
  //   }
  // };

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
            pokemonProvided.handleAddRandomCard();
            console.log(pokemonProvided.pokemonCards);
          }}
        >
          Load More Pok&#233;mon
        </button>
      </div>

      <SnackBar
        snackOpen={pokemonProvided.snackOpen}
        setSnackOpen={pokemonProvided.setSnackOpen}
      />

      <motion.div
        className="card-display__card-holder"
        initial="initial"
        animate="animate"
      >
        {pokemonProvided.pokemonCards
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
