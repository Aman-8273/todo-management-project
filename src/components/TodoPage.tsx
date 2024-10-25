import { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import NewTodo from './todo-form';
import TodoList from '../components/TodoList';
import { Todo, TodoAddHandler, TodoEditHandler, SnackBar } from '../types';
import TodoPagination from './Pagination';
import SnackbarAlert from '../snackbar';

import { useQuery, useMutation } from '@apollo/client';
import { GET_TODOS, CREATE_OR_UPDATE_TODO, DELETE_TODO } from '../queries';

const TodoPage = () => {
  // Managing addTodos
  const [addTodo, setAddTodo] = useState<Todo[]>([]);

  //Setting snackbar
  const [snackbar, setSnackbar] = useState<SnackBar>({
    open: false,
    message: '',
    severity: 'success',
    horizontalPosition: 'center',
    verticalPosition: 'top',
  });

  //Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  //Handling pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [TodosPerPage] = useState<number>(4);

  const [createOrUpdateTodo] = useMutation(CREATE_OR_UPDATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);

  //Fetching data from api
  const { data, loading, error, refetch } = useQuery(GET_TODOS);

  //Handling pagination starting index, last index and shows the todos
  const indexOfLastTodo = currentPage * TodosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - TodosPerPage;

  //sort todos by date (return positive = swap, negative = same order, 0 = same order)
  const sortedItems = [...(addTodo || [])].sort(
    (a, b) => new Date(b.createdDt).getTime() - new Date(a.createdDt).getTime()
  ); // Turn your strings into dates, and convert time into miliseconds

  const currentTodos = sortedItems.slice(indexOfFirstTodo, indexOfLastTodo);

  //Setting api data to state
  useEffect(() => {
    if (data) {
      setAddTodo(data.getAllTodos);
    }
  }, [data]);

  //Add new tasks
  const todoAddHandler: TodoAddHandler = (title, Desc) => {
    (async () => {
      try {
        await createOrUpdateTodo({
          variables: {
            input: {
              title: title,
              description: Desc,
              status: 'PENDING',
            },
          },
        });
        await refetch();
      } catch (err) {
        console.error('Error adding todo:', err);
      }
    })();
  };

  //Edit Todotasks
  const handleEdit: TodoEditHandler = (id, editedTask, editedDesc) => {
    (async () => {
      try {
        await createOrUpdateTodo({
          variables: {
            input: {
              id,
              title: editedTask,
              description: editedDesc,
            },
          },
        });
        await refetch();
      } catch (err) {
        console.error('Error editing todo:', err);
      }
    })();
  };

  //Delete TodoTasks
  const TodoDeleteHandler = (todoId: string) => {
    (async () => {
      try {
        await deleteTodo({ variables: { id: todoId } });

        const { data: newData } = await refetch();
        const filteredTodos = newData?.getAllTodos.filter(
          (todo: Todo) => todo.status !== 'ARCHIVED'
        );

        if (filteredTodos) {
          setAddTodo(filteredTodos);
        }

        //Show delete success snackbar
        setSnackbar({
          open: true,
          message: 'Todo deleted successfully!',
          severity: 'success',
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      } catch (err) {
        console.error('Error deleting todo:', err);
      }
    })();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}!</p>;

  return (
    <Container
      maxWidth='lg'
      sx={{ mt: 4, ml: { xs: 0, md: 8 } }}
    >
      {/* todoform */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: '2rem', md: '4rem' },
        }}
      >
        <Box sx={{ flex: 1 }}>
          <NewTodo handler={todoAddHandler} />
        </Box>

        {/* TodoList  */}
        <Box sx={{ flex: 2 }}>
          <TodoList
            items={currentTodos}
            onDeleteTodos={TodoDeleteHandler}
            handleEdit={handleEdit}
          />
        </Box>

        {/* Delete message */}
        <SnackbarAlert
          open={snackbar.open}
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          message={snackbar.message}
          verticalPosition={snackbar.verticalPosition}
          horizontalPosition={snackbar.horizontalPosition}
        />
      </Box>

      {/* Pagination */}
      <TodoPagination
        totalTodos={addTodo.length || 0}
        perPageTodos={TodosPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Container>
  );
};

export default TodoPage;
