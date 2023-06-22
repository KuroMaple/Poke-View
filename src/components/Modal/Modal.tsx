import { motion } from 'framer-motion';
import Backdrop from '../Backdrop/Backdrop';
import React, { useEffect, useState } from 'react';
import FocusedCard from '../FocusedCard/FocusedCard';
import { Pokemon } from '../../data';

interface Props {
  handleClose: () => void;
  modalOpen: boolean;
  pkmn: Pokemon;
}
const Modal: React.FC<Props> = ({ handleClose, pkmn }) => {
  const [pokemon, setPokemon] = useState(pkmn);

  useEffect(() => {
    setPokemon(pkmn);
  }, [pkmn]);

  const flip = {
    hidden: {
      transform: 'scale(0) rotateY(-360deg)',
      opacity: 0,
      transition: {
        delay: 0.5,
      },
    },
    visible: {
      transform: ' scale(1) rotateY(0deg)',
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      transform: 'scale(0) rotateY(360deg)',
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => {
          e.stopPropagation();
          console.log('pokemon in modal:');
          console.log(pkmn);
        }}
        className="modal orange-gradient"
        variants={flip}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <FocusedCard pkmn={pokemon} />
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
