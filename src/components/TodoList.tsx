// import { useState } from 'react';
// import {
//   Box,
//   Button,
//   List,
//   ListItem,
//   TextField,
//   Typography,
//   Checkbox,
//   FormControlLabel,
//   Divider,
// } from '@mui/material';
// import { TodoListProps } from '../types';
// import EditRoundedIcon from '@mui/icons-material/EditRounded';
// import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

// const TodoList = ({ items, onDeleteTodos, handleEdit }: TodoListProps) => {
//   //Manage Form data
//   const initialValue = {
//     editIndex: null as string | null,
//     editedTask: '',
//     editedDes: '',
//   };
//   const [formValue, setFormValue] = useState(initialValue);

//   //Handling status weather task completed or not
//   const [completedTask, setCompletedTask] = useState<{
//     [key: string]: boolean;
//   }>({});

//   //handle edit functionality
//   const onClickEdit = (id: string, currentText: string, currentDes: string) => {
//     setFormValue({
//       editIndex: id,
//       editedTask: currentText,
//       editedDes: currentDes,
//     });
//   };

//   //handling todo save functionality
//   const handleSave = (id: string) => {
//     const updatedDate = new Date();
//     handleEdit(id, formValue.editedTask, formValue.editedDes, updatedDate);
//     setFormValue(initialValue);
//   };

//   //handling status (Task completed or not)
//   const handleStatus = (id: string) => {
//     setCompletedTask((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   return (
//     <Box sx={{ display: 'flex', px: 2, maxWidth: '100vh', margin: '5px auto' }}>
//       {/* todo-task-list */}
//       <List>
//         {items.map((item) => (
//           <ListItem
//             key={item.id}
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               boxShadow: '-2px 3px 7px 0px rgba(179,175,179,1)',
//               borderRadius: '10px',
//               px: 2,
//               width: '95vh',
//               mb: 1,
//             }}
//           >
//             {/* Update todo's */}
//             {formValue.editIndex === item.id ? (
//               <Box
//                 sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
//               >
//                 <TextField
//                   size='small'
//                   variant='outlined'
//                   value={formValue.editedTask}
//                   sx={{ flexGrow: 1, mr: 2, mb: 1, width: '30rem  ' }}
//                   onChange={(e) =>
//                     setFormValue((prev) => ({
//                       ...prev,
//                       editedTask: e.target.value,
//                     }))
//                   }
//                 />
//                 <TextField
//                   size='small'
//                   variant='outlined'
//                   multiline
//                   maxRows={4}
//                   value={formValue.editedDes}
//                   sx={{ marginRight: 2, mb: 2, width: '30rem' }}
//                   onChange={(e) =>
//                     setFormValue((prev) => ({
//                       ...prev,
//                       editedDes: e.target.value,
//                     }))
//                   }
//                 />
//                 <Button
//                   variant='contained'
//                   onClick={() => handleSave(item.id)}
//                 >
//                   Save
//                 </Button>
//               </Box>
//             ) : (
//               <>
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     width: '100%',
//                   }}
//                 >
//                   <Typography
//                     variant='body1'
//                     sx={{
//                       fontWeight: 'bold',
//                       fontSize: '1.4rem',
//                       textDecoration: completedTask[item.id]
//                         ? 'line-through'
//                         : 'none',
//                     }}
//                   >
//                     {item.text}
//                   </Typography>

//                   <Box sx={{ display: 'flex', gap: '0.5rem' }}>
//                     <Button
//                       onClick={() =>
//                         onClickEdit(item.id, item.text, item.description)
//                       }
//                     >
//                       <EditRoundedIcon />
//                     </Button>
//                     <Button onClick={() => onDeleteTodos(item.id)}>
//                       <DeleteRoundedIcon />
//                     </Button>
//                   </Box>
//                 </Box>

//                 <Box
//                   sx={{
//                     display: 'flex',
//                     justifyContent: 'flex-start',
//                     width: '100%',
//                   }}
//                 >
//                   <Typography
//                     variant='caption'
//                     sx={{
//                       fontSize: '1rem',
//                       textDecoration: completedTask[item.id]
//                         ? 'line-through'
//                         : 'none',
//                     }}
//                   >
//                     {item.description}
//                   </Typography>
//                 </Box>

//                 <Divider sx={{ width: '100%', my: 0.5 }} />

//                 {/* Manage todo status and Dates */}
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     width: '100%',
//                     alignItems: 'center',
//                   }}
//                 >
//                   <FormControlLabel
//                     label='Completed'
//                     control={
//                       <Checkbox
//                         checked={completedTask[item.id] || false}
//                         onChange={() => handleStatus(item.id)}
//                       />
//                     }
//                   />
//                   <Box sx={{ display: 'flex', gap: '1rem' }}>
//                     <Typography
//                       sx={{
//                         fontSize: '0.8rem',
//                         fontWeight: 'bold',
//                         backgroundColor: 'whitesmoke',
//                         padding: '0.2rem 0.5rem',
//                         borderRadius: '5px',
//                       }}
//                     >
//                       {item.currentDate.toLocaleDateString()}
//                     </Typography>
//                     {item.updatedDate && (
//                       <Typography
//                         sx={{
//                           fontSize: '0.8rem',
//                           fontWeight: 'bold',
//                           backgroundColor: 'whitesmoke',
//                           padding: '0.2rem 0.5rem',
//                           borderRadius: '5px',
//                         }}
//                       >
//                         {item.updatedDate?.toLocaleDateString()}
//                       </Typography>
//                     )}
//                   </Box>
//                 </Box>
//               </>
//             )}
//           </ListItem>
//         ))}
//       </List>
//       g
//     </Box>
//   );
// };

// export default TodoList;

import { useState } from 'react';
import {
  Box,
  Button,
  List,
  ListItem,
  TextField,
  Typography,
  // Checkbox,
  // FormControlLabel,
  Divider,
} from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import {
  GET_TODOS,
  CREATE_OR_UPDATE_TODO,
  DELETE_TODO,
} from '../graphql/todoQuries'; // Fix the typo in the import path
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const TodoList = () => {
  const { loading, data, error } = useQuery(GET_TODOS); // Fetch todos from the server
  const [createOrUpdateTodo] = useMutation(CREATE_OR_UPDATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);

  // Manage Form data
  const initialValue = {
    editIndex: null as string | null,
    editedTask: '',
    editedDes: '',
  };
  const [formValue, setFormValue] = useState(initialValue);

  // Manage new todo input
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateOrUpdate = async () => {
    try {
      await createOrUpdateTodo({
        variables: {
          input: { title, description }, // Pass the input according to your schema
        },
        refetchQueries: [{ query: GET_TODOS }], // Refetch todos after mutation
      });
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error('Error creating/updating todo:', err);
    }
  };

  const handleEdit = async (
    id: string,
    updatedTitle: string,
    updatedDescription: string
  ) => {
    const updatedDate = new Date();
    try {
      await createOrUpdateTodo({
        variables: {
          input: {
            id,
            title: updatedTitle,
            description: updatedDescription,
            updateDT: updatedDate,
          }, // Pass the updated data
        },
        refetchQueries: [{ query: GET_TODOS }], // Refetch todos after mutation
      });
    } catch (err) {
      console.error('Error updating todo:', err);
    }
    setFormValue(initialValue); // Reset form state
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo({
        variables: { id },
        refetchQueries: [{ query: GET_TODOS }], // Refetch todos after deletion
      });
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>{error.message}</h3>;

  return (
    <Box>
      <Typography variant='h4'>Todo List</Typography>

      <Box sx={{ marginBottom: '2rem' }}>
        <TextField
          label='Title'
          variant='outlined'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ marginRight: '1rem' }}
        />
        <TextField
          label='Description'
          variant='outlined'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ marginRight: '1rem' }}
        />
        <Button
          variant='contained'
          onClick={handleCreateOrUpdate}
        >
          Add Todo
        </Button>
      </Box>

      <List>
        {data.map((item) => (
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
            {formValue.editIndex === item.id ? (
              <Box
                sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
              >
                <TextField
                  size='small'
                  variant='outlined'
                  value={formValue.editedTask}
                  sx={{ flexGrow: 1, mr: 2, mb: 1, width: '30rem' }}
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
                  value={formValue.editedDes}
                  sx={{ marginRight: 2, mb: 2, width: '30rem' }}
                  onChange={(e) =>
                    setFormValue((prev) => ({
                      ...prev,
                      editedDes: e.target.value,
                    }))
                  }
                />
                <Button
                  variant='contained'
                  onClick={() =>
                    handleEdit(
                      item.id,
                      formValue.editedTask,
                      formValue.editedDes
                    )
                  }
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
                    sx={{ fontWeight: 'bold', fontSize: '1.4rem' }}
                  >
                    {item.title}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                    <Button
                      onClick={() =>
                        setFormValue({
                          editIndex: item.id,
                          editedTask: item.title,
                          editedDes: item.description,
                        })
                      }
                    >
                      <EditRoundedIcon />
                    </Button>
                    <Button onClick={() => handleDelete(item.id)}>
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
                  <Typography variant='caption'>{item.description}</Typography>
                </Box>

                <Divider sx={{ width: '100%', my: 0.5 }} />

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <Typography>Created On: {item.currentDate}</Typography>
                  {item.updateDT && (
                    <Typography>Updated On: {item.updateDT}</Typography>
                  )}
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
