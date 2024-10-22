import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from '@mui/material';
import { ErrorDialogProps } from '../types';

const ErrorDialog = ({ open, message, onClose }: ErrorDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableEnforceFocus
      closeAfterTransition={false}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>Error</DialogTitle>
      <DialogContent>
        <Typography id='alert-dialog-description'>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          autoFocus
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;
