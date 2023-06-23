/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react';
import { Pokemon } from '../data';
import FrontCard from './FrontCard';
import { AnimatePresence, motion } from 'framer-motion';
import Modal from './Modal/Modal';

interface Props {
  pkmn: Pokemon;
  //onClick: (pkmn: any) => void;
}

const Card: React.FC<Props> = ({ pkmn }) => {
  // Determines cards Flip status
  const [isFlipped, setIsFlipped] = useState(true);

  const [modal, setModal] = useState(false);

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
        {modal && pkmn && (
          <Modal modalOpen={modal} handleClose={closeModal} pkmn={pkmn} />
        )}
      </AnimatePresence>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={(e) => {
          e.stopPropagation();
          modal ? closeModal() : openModal();
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
