import { motion } from 'framer-motion';
import Backdrop from '../Backdrop/Backdrop';
import React from 'react';

interface Props {
  handleClose: () => void;
  text: string;
  modalOpen: boolean;
}
const Modal: React.FC<Props> = ({ handleClose, text }) => {
  const dropIn = {
    hidden: {
      y: '-100vh',
      opacity: 0,
    },
    visible: {
      y: '0',
      opacity: 1,
      transition: {
        duration: 0.1,
        type: 'spring',
        damping: 25,
      },
    },
    exit: {
      y: '100vh',
      opacity: 0,
    },
  };

  const flip = {
    hidden: {
      transform: 'scale(0) rotateY(-360deg)',
      opacity: 0,
      transition: {
        delay: 0.2,
      },
    },
    visible: {
      transform: ' scale(1) rotateY(0deg)',
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
    exit: {
      transform: 'scale(0) rotateY(360deg)',
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal orange-gradient"
        variants={flip}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        hi
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
