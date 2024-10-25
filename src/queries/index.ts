import { gql } from '@apollo/client';

//Get users
export const GET_USER_LIST = gql`
  query GetAllowListByUsers {
    getAllowListByUsers
  }
`;

// For fetching todos
export const GET_TODOS = gql`
  query GetAllTodos {
    getAllTodos {
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

// Mutation for create or update
export const CREATE_OR_UPDATE_TODO = gql`
  mutation ($input: TodoInput!) {
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

// Mutation for delete
export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;
