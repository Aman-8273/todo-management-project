import { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import NewTodo from './todo-form';
import TodoList from '../components/TodoList';
import { Todo, TodoAddHandler, TodoEditHandler } from '../types';
import TodoPagination from '../components/Pagination';

import { useQuery, useMutation } from '@apollo/client';
import {
  GET_TODOS,
  CREATE_OR_UPDATE_TODO,
  DELETE_TODO,
} from '../graphql/todoQuries';

const TodoPage = () => {
  const token = localStorage.getItem('token');
  const emailData = token ? JSON.parse(token) : null;

  const { data, loading, error, refetch } = useQuery(GET_TODOS, {
    variables: { email: emailData.email },
  });

  const [createOrUpdateTodo] = useMutation(CREATE_OR_UPDATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);

  // AddTodo
  const [addTodo, setAddTodo] = useState<Todo[]>([]);
  // console.log(addTodo);

  //handle pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [TodosPerPage] = useState<number>(4);

  const indexOfLastTodo = currentPage * TodosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - TodosPerPage;
  const currentTodos = addTodo.slice(indexOfFirstTodo, indexOfLastTodo);

  useEffect(() => {
    if (data) {
      setAddTodo(data.getAllTodos);
    }
  }, [data]);

  //add new tasks
  const todoAddHandler: TodoAddHandler = (title, Des, date) => {
    (async () => {
      try {
        await createOrUpdateTodo({
          variables: {
            input: {
              email: emailData.email,
              title,
              description: Des,
              createdDt: date,
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
  const handleEdit: TodoEditHandler = (id, editedTask, editedDes, updateDt) => {
    (async () => {
      try {
        await createOrUpdateTodo({
          variables: {
            input: {
              id,
              email: emailData.email,
              title: editedTask,
              description: editedDes,
              updateDt,
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
      sx={{ mt: 4, ml: 8 }}
    >
      {/* todoform */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 4,
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
      </Box>

      {/* Pagination */}
      <TodoPagination
        totalTodos={addTodo.length}
        perPageTodos={TodosPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Container>
  );
};

export default TodoPage;
