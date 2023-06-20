import { Snackbar, Alert } from '@mui/material';
import React from 'react';

interface Props {
  snackOpen: boolean;
  setSnackOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SnackBar: React.FC<Props> = ({ snackOpen, setSnackOpen }) => {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };

  return (
    <div>
      <Snackbar open={snackOpen} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{ width: '100%' }}
          variant="filled"
        >
          ERROR: Max Pokemon Count Reached
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackBar;
