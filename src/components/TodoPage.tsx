import { useState } from 'react';
import { Box, Container } from '@mui/material';
import NewTodo from './todo-form';
import TodoList from '../components/TodoList';
import { Todo, TodoAddHandler, TodoEditHandler } from '../types';
import TodoPagination from '../components/Pagination';

const TodoPage = () => {
  // AddTodo
  const [addTodo, setAddTodo] = useState<Todo[]>([]);
  // console.log(addTodo);

  //handle pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [TodosPerPage] = useState<number>(4);

  const indexOfLastTodo = currentPage * TodosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - TodosPerPage;
  const currentTodos = addTodo.slice(indexOfFirstTodo, indexOfLastTodo);

  //add new todo's
  const todoAddHandler: TodoAddHandler = (text, Des, date, updatedDT) => {
    setAddTodo((prevTodos) => [
      {
        id: Math.random().toString(),
        text: text,
        description: Des,
        currentDate: date,
        updatedDate: updatedDT,
      },
      ...prevTodos,
    ]);
  };

  //Handling edit functionality
  const handleEdit: TodoEditHandler = (
    id,
    editedTask,
    editedDes,
    updatedDT
  ) => {
    const updatedTask = addTodo.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            text: editedTask,
            description: editedDes,
            updatedDate: updatedDT,
          }
        : todo
    );
    setAddTodo(updatedTask);
  };

  //handling delete functionality
  const TodoDeleteHandler = (todoId: string) => {
    setAddTodo((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== todoId);
    });
  };

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
