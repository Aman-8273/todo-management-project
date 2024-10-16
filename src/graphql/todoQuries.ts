import { gql } from '@apollo/client';

// Query to fetch todos
export const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      description
      status
      currentDate
      updateDT
    }
  }
`;

// Mutation to create or update a todo
export const CREATE_OR_UPDATE_TODO = gql`
  mutation CreateOrUpdateTodo($input: TodoInput!) {
    createOrUpdateTodo(input: $input) {
      id
      title
      description
      status
    }
  }
`;

// Mutation to delete a todo
export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;
