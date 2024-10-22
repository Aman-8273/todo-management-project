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
import { TodoListProps } from '../types';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_OR_UPDATE_TODO, GET_TODOS } from '../queries';

const TodoList = ({ items, onDeleteTodos, handleEdit }: TodoListProps) => {
  //Getting token from localStorage and fetch email from it
  const token = localStorage.getItem('token');
  const emailData = token ? JSON.parse(token) : null;

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
            email: emailData.email,
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
    const updatedDt = new Date();

    handleEdit(id, formValue.editedTask, formValue.editedDesc, updatedDt);
    setFormValue(initialValue);
  };

  //sort todos by date (return positive = swap, negative = same order, 0 = same order)
  const sortedItems = [...items].sort(
    (a, b) => new Date(b.createdDt).getTime() - new Date(a.createdDt).getTime()
  ); // Turn your strings into dates, and convert time into miliseconds

  return (
    <Box sx={{ display: 'flex', px: 2, maxWidth: '100vh', margin: '5px auto' }}>
      {/* todoTask-list */}
      <List>
        {sortedItems.map((item) => (
          <ListItem
            key={item.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-2px 3px 7px 0px rgba(179,175,179,1)',
              borderRadius: '10px',
              px: 2,
              width: '95vh',
              mb: 1,
            }}
          >
            {/* Update todos */}
            {formValue.editIndex === item.id ? (
              <Box
                sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
              >
                <TextField
                  size='small'
                  variant='outlined'
                  value={formValue.editedTask}
                  sx={{ flexGrow: 1, mr: 2, mb: 1, width: '30rem  ' }}
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
                  sx={{ marginRight: 2, mb: 2, width: '30rem' }}
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
                  }}
                >
                  <Typography
                    variant='body1'
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '1.4rem',
                      textDecoration:
                        item.status === 'COMPLETED' ? 'line-through' : 'none',
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: '0.5rem' }}>
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

                <Divider sx={{ width: '100%', my: 0.5 }} />

                {/* Manage todoStatus and Dates */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
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
    </Box>
  );
};

export default TodoList;
