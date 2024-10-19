import React, { useRef, useState } from 'react';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  Typography,
} from '@mui/material';
import { OnAddTodo } from '../types';

const NewTodo = ({ handler }: OnAddTodo) => {
  //Manage input fields
  const InputRef = useRef<HTMLInputElement>(null);
  const DesInputRef = useRef<HTMLInputElement>(null);

  //Handling Error
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  //Close error dialog box
  const handleClose = () => {
    setOpen(false);
  };

  // AddTodo handler
  const onAddTodo = (event: React.FormEvent) => {
    event.preventDefault();

    //Set current date to todos
    const currentDate = new Date();

    //get title & description information
    const enteredText = InputRef.current!.value;
    const enteredDescription = DesInputRef.current!.value;

    //Manage the errors
    switch (true) {
      case enteredText === '' || enteredDescription === '':
        setErrorMessage('Please fill out both of the fields!');
        setOpen(true);
        break;

      case enteredDescription.trim().length > 250:
        setErrorMessage('Maximum length for the description is 250 characters');
        setOpen(true);
        break;

      case enteredText.trim().length > 40:
        setErrorMessage('Maximum length for the title is 40 characters');
        setOpen(true);
        break;

      default:
        handler(enteredText, enteredDescription, currentDate);

        InputRef.current!.value = '';
        DesInputRef.current!.value = '';
        break;
    }
  };

  return (
    <Container
      maxWidth='lg'
      sx={{ mt: 2 }}
    >
      {/* todo-form */}
      <Box sx={{ width: '35rem' }}>
        <form onSubmit={onAddTodo}>
          <Box sx={{ mb: 2 }}>
            <FormControl
              fullWidth
              sx={{ mb: 2 }}
            >
              <TextField
                size='small'
                label='Title'
                fullWidth
                inputRef={InputRef}
              />
            </FormControl>
            <FormControl
              sx={{ mb: 1, display: 'flex', justifyContent: 'flex-end' }}
            >
              <TextField
                size='small'
                label='Description'
                multiline
                rows={4}
                fullWidth
                inputRef={DesInputRef}
              />
            </FormControl>
          </Box>

          <Box>
            <Button
              variant='contained'
              type='submit'
            >
              <AddTaskRoundedIcon />
            </Button>
          </Box>
        </form>
      </Box>

      {/* Error handling */}
      <Dialog
        open={open}
        onClose={handleClose}
        disableEnforceFocus
        closeAfterTransition={false}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Error</DialogTitle>
        <DialogContent>
          <Typography id='alert-dialog-description'>{errorMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            aria-label='this is area label'
            onClick={handleClose}
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default NewTodo;
