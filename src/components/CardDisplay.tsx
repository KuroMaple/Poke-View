/* eslint-disable react/jsx-key */
import { useContext, useState } from 'react';
import Card from './Card';
import { AnimatePresence, motion } from 'framer-motion';
import { TypeContext } from '../context/typeContext';
import SnackBar from './SnackBar';
import { PokemonContext } from '../context/PokemonContext';
import React from 'react';
import { DarkModeContext } from '../context/DarkModeContext';
import Modal from './Modal/Modal';

const CardDisplay = () => {
  // Contains the selected type to filter by
  const providedValue = useContext(TypeContext);

  // Pokemon array and all operations on array
  const pokemonProvided = useContext(PokemonContext);

  const [focusedPokemon, setFocusedPokemon] = useState(null);

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

  // modal info and setter
  const { modalOpen, setModalOpen } = useContext(PokemonContext);

  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);

  const onClickCard = (pkmn: any) => {
    modalOpen ? closeModal() : openModal();
    setFocusedPokemon(pkmn);
  };

  return (
    <div className="card-display">
      <div className="card-display__button-holder">
        <button
          className="card-display__button"
          onClick={() => {
            pokemonProvided.handleAddRandomCard();
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
        onClick={(e) => {
          modalOpen ? closeModal() : openModal();
          console.log('on click in card component');
          //console.log(pkmn);
        }}
      >
        {pokemonProvided.pokemonCards
          .filter((curPkmn) =>
            typeDisplay(curPkmn.typePrimary, curPkmn.typeSecondary)
          )
          .map((curPkmn) => (
            <div>
              <AnimatePresence
                // Disable any initial animations on children that
                // are present when the component is first rendered
                initial={false}
                // Only render one component at a time.
                // The exiting component will finish its exit
                // animation before entering component is rendered
                mode="wait"
                // Fires when all exiting nodes have completed animating out
                onExitComplete={() => null}
              >
                {modalOpen && curPkmn && (
                  <Modal
                    modalOpen={modalOpen}
                    handleClose={closeModal}
                    pkmn={curPkmn}
                  />
                )}
              </AnimatePresence>
              <Card
                key={curPkmn.id}
                pkmn={curPkmn}
                onClick={() => onClickCard(curPkmn)}
              />
            </div>
          ))}
      </motion.div>
    </div>
  );
};

export default CardDisplay;
