/* eslint-disable react/jsx-key */
import { useContext } from 'react';
import Card from './Card';
import { motion } from 'framer-motion';
import { TypeContext } from '../context/typeContext';
import SnackBar from './SnackBar';
import { PokemonContext } from '../context/PokemonContext';
import React from 'react';
import { DarkModeContext } from '../context/DarkModeContext';

const CardDisplay = () => {
  // Corresponds to the Error snack bar
  // const [snackOpen, setSnackOpen] = useState(false);

  // Contains the selected type to filter by
  const providedValue = useContext(TypeContext);

  // Pokemon array and all operations on array
  const pokemonProvided = useContext(PokemonContext);



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
        variant={pokemonProvided.variant}
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
      </motion.div>
    </div>
  );
};

export default CardDisplay;
