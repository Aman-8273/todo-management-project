import { useState } from 'react';
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
import { useEffect } from 'react';

const TodoPage = () => {
  //TODO
  const email = 'krips@mail.com'; // Hardcoded email
  const { data, loading, error, refetch } = useQuery(GET_TODOS, {
    variables: { email },
  }); // Fetch todos

  const [createOrUpdateTodo] = useMutation(CREATE_OR_UPDATE_TODO); // Mutation to create/update
  const [deleteTodo] = useMutation(DELETE_TODO); // Mutation to delete todos

  // AddTodo
  const [addTodo, setAddTodo] = useState<Todo[]>([]);
  // console.log(addTodo);

  //handle pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [TodosPerPage] = useState<number>(4);

  //TODO
  useEffect(() => {
    if (data) {
      setAddTodo(data.getAllTodos);
    }
  }, [data]);

  const indexOfLastTodo = currentPage * TodosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - TodosPerPage;
  const currentTodos = addTodo.slice(indexOfFirstTodo, indexOfLastTodo);

  //add new todo's
  const todoAddHandler: TodoAddHandler = async (
    title,
    Des,
    date,
    updatedDt
  ) => {
    // setAddTodo((prevTodos) => [
    //   {
    //     id: Math.random().toString(),
    //     text: text,
    //     description: Des,
    //     currentDate: date,
    //     updatedDate: updatedDT,
    //   },
    //   ...prevTodos,
    // ]);

    //TODO
    await createOrUpdateTodo({
      variables: {
        input: {
          email: 'krips@mail.com',
          title: title,
          description: Des,
          createdDt: date,
          status: 'PENDING',
          updateDt: updatedDt,
        },
      },
    });
    refetch();
  };

  //Handling edit functionality
  const handleEdit: TodoEditHandler = async (
    id,
    editedTask,
    editedDes,
    updatedDt
  ) => {
    // const updatedTask = addTodo.map((todo) =>
    //   todo.id === id
    //     ? {
    //         ...todo,
    //         text: editedTask,
    //         description: editedDes,
    //         updatedDate: updatedDT,
    //       }
    //     : todo
    // );
    // setAddTodo(updatedTask);

    //TODO
    await createOrUpdateTodo({
      variables: {
        input: {
          id,
          email: 'krips@mail.com',
          title: editedTask,
          description: editedDes,
          updateDt: updatedDt,
        },
      },
    });
    refetch();
  };

  //handling delete functionality
  const TodoDeleteHandler = async (todoId: string) => {
    // setAddTodo((prevTodos) => {
    //   return prevTodos.filter((todo) => todo.id !== todoId);
    // });

    //TODO
    await deleteTodo({ variables: { id: todoId } });
    refetch();
  };

  //TODO
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}!</p>;

  return (
    <Container
      maxWidth='lg'
      sx={{ mt: 4, ml: 8 }}
    >
      {/* todo-form */}
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
