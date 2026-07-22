import { Snackbar, Alert } from '@mui/material';
import React from 'react';

interface Props {
  snackOpen: boolean;
  setSnackOpen: React.Dispatch<React.SetStateAction<boolean>>;
  variant: string;
}

// Error message per variant — add a case by adding a line here.
const MESSAGES: Record<string, string> = {
  MaxPkmn: 'ERROR: Max Pokémon Count Reached',
  DplctePkmn: 'ERROR: Duplicate Pokémon not allowed',
  FetchError: 'ERROR: Could not load Pokémon. Please try again.',
};

const SnackBar: React.FC<Props> = ({ snackOpen, setSnackOpen, variant }) => {
  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return;
    setSnackOpen(false);
  };

  const message = MESSAGES[variant];

  return (
    <Snackbar open={snackOpen} autoHideDuration={4000} onClose={handleClose}>
      {message ? (
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      ) : undefined}
    </Snackbar>
  );
};

export default SnackBar;
