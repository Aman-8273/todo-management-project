// ? can be used optional chaining

//Manage todo's
export interface Todo {
  id: string;
  text: string;
  description: string;
  currentDate: Date;
  updatedDate: Date | null;
}

//add todo data
export interface TodoAddHandler {
  (
    text: string,
    description: string,
    date: Date,
    updatedDate: Date | null
  ): void;
}

//edit todo
export interface TodoEditHandler {
  (
    id: string,
    editedTask: string,
    editedDes: string,
    updatedDT: Date | null
  ): void;
}

//TodoPage
export interface TodoPageProps {
  todoAddHandler: TodoAddHandler;
  handleEdit: TodoEditHandler;
  onDeleteTodo: (id: string) => void;
  todos: Todo[];
}

//add todo  handler functionality
export interface OnAddTodo {
  handler: (
    text: string,
    Des: string,
    date: Date,
    updatedDT: Date | null
  ) => void;
}

//TodoList
export interface TodoListProps {
  items: {
    id: string;
    text: string;
    description: string;
    currentDate: Date;
    updatedDate: Date | null;
  }[]; // array of objects
  onDeleteTodos: (id: string) => void;
  handleEdit: (
    id: string,
    editedTask: string,
    editedDes: string,
    updatedDT: Date | null
  ) => void;
}

//Home
export interface DecodedToken {
  email_verified: boolean;
  name: string;
  email: string;
}

//Header
export interface UserData {
  name: string;
  email: string;
  picture: string;
}

//Pagination
export interface Pagination {
  totalTodos: number;
  perPageTodos: number;
  currentPage: number;
  setCurrentPage: (pageNum: number) => void;
}

//api
export interface Api {
  id: string;
  title: string;
  description: string;
  currentDate: string;
  updateDT?: string;
}
