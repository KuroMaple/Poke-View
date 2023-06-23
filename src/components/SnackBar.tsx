/* eslint-disable @typescript-eslint/no-unused-vars */
import { Snackbar, Alert } from '@mui/material';
import React from 'react';

interface Props {
  snackOpen: boolean;
  setSnackOpen: React.Dispatch<React.SetStateAction<boolean>>; // TODO FIX after deployment
  variant: string;
}

const SnackBar: React.FC<Props> = ({ snackOpen, setSnackOpen, variant }) => {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    console.log(event);

    setSnackOpen(false);
  };
  const generateVariant = () => {
    switch (variant) {
      case 'MaxPkmn':
        return (
          <Alert
            onClose={handleClose}
            severity="error"
            sx={{ width: '100%' }}
            variant="filled"
          >
            ERROR: Max Pok&#233;mon Count Reached
          </Alert>
        );
        break;
      case 'DplctePkmn':
        return (
          <Alert
            onClose={handleClose}
            sx={{ width: '100%' }}
            variant="filled"
            severity="error"
          >
            ERROR: Duplicate Pok&#233;mon not allowed
          </Alert>
        );
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Snackbar
        open={snackOpen}
        autoHideDuration={4000} /*onClose={handleClose}*/
      >
        {generateVariant()}
      </Snackbar>
    </div>
  );
};

export default SnackBar;
