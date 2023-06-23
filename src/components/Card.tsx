/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react';
import { Pokemon } from '../data';
import FrontCard from './FrontCard';
import { motion } from 'framer-motion';
import Modal from './Modal/Modal';

interface Props {
  pkmn: Pokemon;
  //onClick: (pkmn: any) => void;
}

const Card: React.FC<Props> = ({ pkmn }) => {
  // Determines cards Flip status
  const [isFlipped, setIsFlipped] = useState(true);

  const [modal, setModal] = useState(false);

  // modal info and setter
  //const { modalOpen, setModalOpen } = useContext(PokemonContext);

  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);

  const flipper = () => {
    setIsFlipped(false);
  };

  // Timer to run flipping animation
  setTimeout(flipper, 1500);

  const FlipVariant = {
    initial: {
      rotateY: 0,
      transition: { duration: 1 },
    },
    animate: {
      rotateY: 90,
      transition: { duration: 1 },
    },
  };

  return (
    <>
      {modal && pkmn && (
        <Modal modalOpen={modal} handleClose={closeModal} pkmn={pkmn} />
      )}
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={(e) => {
          e.stopPropagation();
          modal ? closeModal() : openModal();
          console.log('on click in card component');
          console.log(pkmn);
        }}
      >
        {isFlipped ? (
          <motion.div
            className="card__back"
            variants={FlipVariant}
            initial="initial"
            animate="animate"
          ></motion.div>
        ) : (
          <FrontCard pokemon={pkmn} />
        )}
      </motion.div>
    </>
  );
};

export default Card;
