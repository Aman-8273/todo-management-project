import { useState } from 'react';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { Box, Button, Container, FormControl, TextField } from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { OnAddTodo, SnackBar } from '../types';
import ErrorDialog from './error-dialog';
import { TodoFormInputs } from '../types/index.ts';
import SnackbarAlert from '../snackbar/index.tsx';

const NewTodo = ({ handler }: OnAddTodo) => {
  //Setting snackbar
  const [snackbar, setSnackbar] = useState<SnackBar>({
    open: false,
    message: '',
    severity: 'success',
    horizontalPosition: 'center',
    verticalPosition: 'top',
  });

  //React hook form
  const {
    control, //Tracking data and stop re-rendering
    handleSubmit, //Pass the form data to other function
    reset, //Reset the form
    formState: { errors }, //Handling error
  } = useForm<TodoFormInputs>({
    defaultValues: { enteredText: '', enteredDescription: '' },
  });

  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  //Close Error dialog box
  const handleClose = () => setOpen(false);

  //Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const onAddTodo: SubmitHandler<TodoFormInputs> = (data) => {
    //Getting title & description
    console.log(data);
    const { enteredText, enteredDescription } = data;

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
        handler(enteredText, enteredDescription);
        reset();

        //Show success snackbar
        setSnackbar({
          open: true,
          message: 'Todo added successfully!',
          severity: 'success',
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
        });
        break;
    }
  };

  return (
    <Container
      maxWidth='lg'
      sx={{ mt: 2 }}
    >
      <Box sx={{ width: { xs: '19rem', md: '35rem' } }}>
        <form onSubmit={handleSubmit(onAddTodo)}>
          <Box sx={{ mb: 2 }}>
            <FormControl
              fullWidth
              sx={{ mb: 2 }}
            >
              <Controller
                name='enteredText'
                control={control}
                rules={{ required: 'Title is required', maxLength: 40 }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size='small'
                    label='Title'
                    error={!!errors.enteredText}
                    helperText={errors.enteredText?.message}
                  />
                )}
              />
            </FormControl>

            <FormControl
              sx={{ mb: 1, display: 'flex', justifyContent: 'flex-end' }}
            >
              <Controller
                name='enteredDescription'
                control={control}
                rules={{ required: 'Description is required', maxLength: 250 }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size='small'
                    label='Description'
                    multiline
                    rows={4}
                    error={!!errors.enteredDescription}
                    helperText={errors.enteredDescription?.message}
                  />
                )}
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

      <SnackbarAlert
        open={snackbar.open}
        onClose={handleCloseSnackbar}
        severity={snackbar.severity}
        message={snackbar.message}
        horizontalPosition={snackbar.horizontalPosition}
        verticalPosition={snackbar.verticalPosition}
      />

      <ErrorDialog
        open={open}
        message={errorMessage}
        onClose={handleClose}
      />
    </Container>
  );
};

export default NewTodo;
