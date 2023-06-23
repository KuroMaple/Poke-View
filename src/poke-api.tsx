import { maxPokemonCount } from './data';

const pokeAPI = {
  getPokemon: async (id: number | string) => {
    try {
      const pokemonResponse = await fetch(
        'https://pokeapi.co/api/v2/pokemon/' + id
      );

      const pokemonData = await pokemonResponse.json();
      return pokemonData;
    } catch (error) {
      // Handle error
      console.error('Error fetching Pokemon Data:', error);
      throw error;
    }
  },

  // Gets the comprehensive list of all pokemon currently in app
  getPokemonNames: async () => {
    try {
      const pokemonGroup = await fetch(
        'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=' + maxPokemonCount
      );

      const pokemonList = await pokemonGroup.json();
      return pokemonList.results;
    } catch (error) {
      // Handle error
      console.error('Error fetching Pokemon Data:', error);
      throw error;
    }
  },

  getSpecies: async (id: number | string) => {
    if (id === 'tornadus-incarnate') id = 'tornadus'; // TO DO: REPLACE names with ids only to avoud similair bugs
    try {
      const speciesResponse = await fetch(
        'https://pokeapi.co/api/v2/pokemon-species/' + id
      );

      const speciesData = await speciesResponse.json();
      return speciesData;
    } catch (error) {
      // Handle error
      console.error('Error fetching Species Data:', error);
      throw error;
    }
  },
};

export default pokeAPI;
