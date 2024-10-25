import React from 'react';
import {
  Snackbar,
  Alert,
  AlertColor,
  SnackbarCloseReason,
} from '@mui/material';

interface SnackbarAlertProps {
  open: boolean;
  message: string;
  severity: AlertColor; // 'error' | 'warning' | 'info' | 'success'
  onClose: (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => void;
  verticalPosition?: 'top' | 'bottom';
  horizontalPosition?: 'center' | 'left' | 'right';
}

const SnackbarAlert = ({
  open,
  message,
  severity,
  onClose,
  horizontalPosition = 'center',
  verticalPosition = 'top',
}: SnackbarAlertProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      sx={{ width: '20%' }}
      onClose={onClose}
      anchorOrigin={{
        vertical: verticalPosition,
        horizontal: horizontalPosition,
      }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
