import React, { useRef, useState } from 'react';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { Box, Button, Container, FormControl, TextField } from '@mui/material';
import { OnAddTodo } from '../types';
import ErrorDialog from './error-dialog';

const NewTodo = ({ handler }: OnAddTodo) => {
  //Managing input fields
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

    //Setting current date to todos
    const currentDate = new Date();

    //Getting title & description information
    const enteredText = InputRef.current!.value;
    const enteredDescription = DesInputRef.current!.value;

    //Managing the errors
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
      {/* todoform */}
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
      <ErrorDialog
        open={open}
        message={errorMessage}
        onClose={handleClose}
      />
    </Container>
  );
};

export default NewTodo;
