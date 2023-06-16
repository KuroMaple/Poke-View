const pokeAPI = {
  getPokemon: async (id: number) => {
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

  getSpecies: async (id: number) => {
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
