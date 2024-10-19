import { gql } from '@apollo/client';

// Query to fetch todos
export const GET_TODOS = gql`
  query GetAllTodos($email: String!) {
    getAllTodos(email: $email) {
      id
      title
      description
      status
      createdDt
      updateDt
      # isUpdated
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
      createdDt
      updateDt
    }
  }
`;

// Mutation to delete a todo
export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;
