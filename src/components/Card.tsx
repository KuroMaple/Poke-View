import React, { useState } from 'react';
import { Pokemon } from '../data';
import FrontCard from './FrontCard';
import { AnimatePresence, motion } from 'framer-motion';
import Modal from './Modal/Modal';

interface Props {
  pkmn: Pokemon;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Card: React.FC<Props> = ({ pkmn, setModalOpen }) => {
  const [localModalOpen, setLocalModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
    setLocalModalOpen(false);
  };
  const openModal = () => {
    setModalOpen(true);
    setLocalModalOpen(true);
  };

  return (
    <>
      <AnimatePresence
        initial={false}
        mode="wait"
        onExitComplete={() => null}
      >
        {localModalOpen && pkmn && (
          <Modal
            modalOpen={localModalOpen}
            handleClose={closeModal}
            pkmn={pkmn}
          />
        )}
      </AnimatePresence>

      {/*
        The flip is fully declarative now — no isFlipped state, no timer, no
        useEffect. A single 3D-rotated element carries two faces (front/back).
        framer's `transition.delay` owns the 1.5s wait and `duration` the turn.
        Starting at rotateY(180) shows the back; animating to 0 reveals the
        front. `backface-visibility: hidden` (App.css) hides whichever face
        currently points away from the viewer.
      */}
      <div
        id="whole-card"
        className="flip-card"
        onClick={(e) => {
          e.stopPropagation();
          localModalOpen ? closeModal() : openModal();
        }}
      >
        <motion.div
          className="flip-card__inner"
          initial={{ rotateY: 180 }}
          animate={{ rotateY: 0 }}
          transition={{ delay: 0.25, duration: 0.5, ease: 'easeInOut' }}
        >
          <div className="flip-card__face flip-card__face--front">
            <FrontCard pokemon={pkmn} />
          </div>
          <div className="flip-card__face flip-card__face--back card__back" />
        </motion.div>
      </div>
    </>
  );
};

export default Card;
