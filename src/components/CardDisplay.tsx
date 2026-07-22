/* eslint-disable react/react-in-jsx-scope */
import { useContext } from 'react';
import Card from './Card';
import { motion } from 'framer-motion';
import { TypeContext } from '../context/typeContext';
import SnackBar from './SnackBar';
import { PokemonContext } from '../context/PokemonContext';

const CardDisplay = () => {
  // Contains the selected type to filter by
  const providedValue = useContext(TypeContext);

  // Pokemon array and all operations on array
  const pokemonProvider = useContext(PokemonContext);

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
            try {
              pokemonProvider.handleAddRandomCard();
            } catch (error) {
              // A failed load leaves search empty rather than crashing — but log it,
              // so a broken API doesn't fail silently.
              console.error('Failed to add random Pokemon', error);
            }
          }}
        >
          Load More Pok&#233;mon
        </button>
      </div>

      <SnackBar
        snackOpen={pokemonProvider.snackOpen}
        setSnackOpen={pokemonProvider.setSnackOpen}
        variant={pokemonProvider.variant}
      />

      <motion.div className="card-display__card-holder">
        {pokemonProvider.pokemonCards
          .filter((curPkmn) =>
            typeDisplay(curPkmn.typePrimary, curPkmn.typeSecondary)
          )
          .map((curPkmn) => (
            <Card
              key={curPkmn.id}
              pkmn={curPkmn}
              setModalOpen={pokemonProvider.setModalOpen}
            />
          ))}
      </motion.div>
    </div>
  );
};

export default CardDisplay;
