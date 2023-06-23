/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
import { createContext } from 'react';
import { Pokemon, maxPokemonCount } from '../data';
import pokeAPI from '../poke-api';

// This file handles data manipulation related to the Pokemon Cards
//    array.

interface Props {
  pokemonCards: Pokemon[];
  setPokemonCards: React.Dispatch<React.SetStateAction<Pokemon[]>>;
  handleAddRandomCard: () => void;
  snackOpen: boolean;
  setSnackOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddCardByName: (name: string) => void;
  variant: string;
  setVariant: React.Dispatch<React.SetStateAction<string>>;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const setAnimatedSprites = (pkmn: Pokemon) => {
  pkmn.animatedFront =
    'https://raw.githubusercontent.com/sashafirsov/pokeapi-sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/' +
    pkmn.id +
    '.gif';
  pkmn.animatedBack =
    'https://raw.githubusercontent.com/sashafirsov/pokeapi-sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/' +
    pkmn.id +
    '.gif';
  pkmn.animatedShinyFront =
    'https://github.com/sashafirsov/pokeapi-sprites/blob/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/' +
    pkmn.id +
    '.gif?raw=true';
  pkmn.animatedShinyBack =
    'https://github.com/sashafirsov/pokeapi-sprites/blob/master/sprites/pokemon/versions/generation-v/black-white/animated/back/shiny/' +
    pkmn.id +
    '.gif?raw=true';
  return pkmn;
};

export const generatePokemon = async (
  id: number | string
): Promise<Pokemon> => {
  const api = pokeAPI;
  const pokemonData = await api.getPokemon(id); //API calls
  const speciesData = await api.getSpecies(id);
  // Process the fetched data
  let pkmnData: Pokemon = {
    name: pokemonData.name,
    id: pokemonData.id,
    hp: pokemonData.stats[0].base_stat,
    atk: pokemonData.stats[1].base_stat,
    def: pokemonData.stats[2].base_stat,
    spAtk: pokemonData.stats[3].base_stat,
    spDef: pokemonData.stats[4].base_stat,
    speed: pokemonData.stats[5].base_stat,
    front_sprite: pokemonData.sprites.front_default,
    front_shiny: pokemonData.sprites.front_shiny,
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

  pkmnData = setAnimatedSprites(pkmnData);
  return pkmnData;
};

// Generates random number between 1 and 500
export const randomPokemon500 = () => {
  return Math.floor(Math.random() * maxPokemonCount) + 1;
};

// Default value cuz anopiler being annoying
const defaultProps: Props = {
  pokemonCards: [],
  setPokemonCards: () => {},
  handleAddRandomCard: () => {},
  snackOpen: false,
  setSnackOpen: () => {},
  handleAddCardByName: () => {},
  variant: '',
  setVariant: () => {},
  modalOpen: false,
  setModalOpen: () => {},
};

export const PokemonContext = createContext<Props>(defaultProps);
