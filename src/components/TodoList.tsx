import { useState } from 'react';
import {
  Box,
  Button,
  List,
  ListItem,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Divider,
} from '@mui/material';
import { TodoListProps, SnackBar } from '../types';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useMutation, useQuery } from '@apollo/client';
import SnackbarAlert from '../snackbar';
import { CREATE_OR_UPDATE_TODO, GET_TODOS } from '../queries';

const TodoList = ({ items, onDeleteTodos, handleEdit }: TodoListProps) => {
  //Snackbar for success
  const [snackbar, setSnackbar] = useState<SnackBar>({
    open: false,
    message: '',
    severity: 'success',
    horizontalPosition: 'center',
    verticalPosition: 'top',
  });

  //Manage Form data
  const initialValue = {
    editIndex: null as string | null,
    editedTask: '',
    editedDesc: '',
  };
  const [formValue, setFormValue] = useState(initialValue);

  // Fetch todos from api
  const { refetch } = useQuery(GET_TODOS, {
    fetchPolicy: 'network-only', //  always fetch the new data
  });

  const [updateStatus] = useMutation(CREATE_OR_UPDATE_TODO);

  //Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  //Managing status (completed or pending)
  const handleStatusChange = async (
    id: string,
    currentStatus: string,
    title: string,
    description: string
  ) => {
    enum status {
      P = 'PENDING',
      C = 'COMPLETED',
    }
    const newStatus = currentStatus === status.P ? status.C : status.P;

    try {
      await updateStatus({
        variables: {
          input: {
            id,
            status: newStatus,
            title,
            description,
          },
        },
      });
      refetch();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  //handle edit functionality
  const onClickEdit = (
    id: string,
    currentTitle: string,
    currentDesc: string
  ) => {
    setFormValue({
      editIndex: id,
      editedTask: currentTitle,
      editedDesc: currentDesc,
    });
  };

  //handling TodoSave functionality
  const handleSave = async (id: string) => {
    handleEdit(id, formValue.editedTask, formValue.editedDesc);
    setFormValue(initialValue);

    //Sucess message on Edit
    setSnackbar({
      open: true,
      message: 'Todo Edit Successfully!',
      severity: 'success',
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        px: { xs: 1, sm: 2 },
        width: '100%',
        margin: '5px auto',
      }}
    >
      {/* todoTask-list */}
      <List sx={{ width: '100%', maxWidth: '1200px', mx: 'auto' }}>
        {items.map((item) => (
          <ListItem
            key={item.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-2px 3px 7px 0px rgba(179,175,179,1)',
              borderRadius: '10px',
              px: 2,
              width: '100%',
              mb: 1,
            }}
          >
            {/* Update todos */}
            {formValue.editIndex === item.id ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <TextField
                  size='small'
                  variant='outlined'
                  value={formValue.editedTask}
                  sx={{ mb: 1 }}
                  onChange={(e) =>
                    setFormValue((prev) => ({
                      ...prev,
                      editedTask: e.target.value,
                    }))
                  }
                />
                <TextField
                  size='small'
                  variant='outlined'
                  multiline
                  maxRows={4}
                  value={formValue.editedDesc}
                  sx={{ mb: 2 }}
                  onChange={(e) =>
                    setFormValue((prev) => ({
                      ...prev,
                      editedDesc: e.target.value,
                    }))
                  }
                />
                <Button
                  variant='contained'
                  onClick={() => handleSave(item.id)}
                >
                  Save
                </Button>
              </Box>
            ) : (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    flexWrap: 'wrap',
                    gap: 1,
                  }}
                >
                  <Typography
                    variant='body1'
                    sx={{
                      fontWeight: 'bold',
                      fontSize: { xs: '1.1rem', sm: '1.4rem' },
                      textDecoration:
                        item.status === 'COMPLETED' ? 'line-through' : 'none',
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      onClick={() =>
                        onClickEdit(item.id, item.title, item.description)
                      }
                    >
                      <EditRoundedIcon />
                    </Button>
                    <Button onClick={() => onDeleteTodos(item.id)}>
                      <DeleteRoundedIcon />
                    </Button>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    width: '100%',
                  }}
                >
                  <Typography
                    variant='caption'
                    sx={{
                      fontSize: '1rem',
                      textDecoration:
                        item.status === 'COMPLETED' ? 'line-through' : 'none',
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>

                <Divider sx={{ width: '100%', my: 1 }} />

                {/* Manage todoStatus and Dates */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <FormControlLabel
                    label='Completed'
                    control={
                      <Checkbox
                        checked={item.status === 'COMPLETED'}
                        onChange={() =>
                          handleStatusChange(
                            item.id,
                            item.status,
                            item.title,
                            item.description
                          )
                        }
                      />
                    }
                  />
                  <Box sx={{ display: 'flex', gap: '1rem' }}>
                    <Typography
                      sx={{
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        backgroundColor: 'whitesmoke',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '5px',
                      }}
                    >
                      {item.createdDt
                        ? new Date(item.createdDt).toLocaleDateString()
                        : null}
                    </Typography>

                    {item.updateDt !== item.createdDt && (
                      <Typography
                        sx={{
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          backgroundColor: 'whitesmoke',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '5px',
                        }}
                      >
                        {item.updateDt
                          ? new Date(item.updateDt).toLocaleDateString()
                          : null}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </>
            )}
          </ListItem>
        ))}
      </List>

      {/*Edit  Success Snackbar */}
      <SnackbarAlert
        open={snackbar.open}
        onClose={handleCloseSnackbar}
        severity={snackbar.severity}
        message={snackbar.message}
        horizontalPosition={snackbar.horizontalPosition}
        verticalPosition={snackbar.verticalPosition}
      />
    </Box>
  );
};

export default TodoList;
