// ? can be used optional chaining

//Manage todo's
export interface Todo {
  id: string;
  title: string;
  description: string;
  status: string;
  createdDt: Date;
  updateDt: Date | null;
}

//add todo data
export interface TodoAddHandler {
  (title: string, description: string, date: Date): void;
}

//edit todo
export interface TodoEditHandler {
  (
    id: string,
    editedTask: string,
    editedDes: string,
    updateDt: Date | null
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
    title: string,
    Des: string,
    date: Date
    // updateDt: Date | null
  ) => void;
}

//TodoList
export interface TodoListProps {
  items: {
    id: string;
    title: string;
    description: string;
    status: string;
    createdDt: Date;
    updateDt: Date | null;
  }[]; // array of objects
  onDeleteTodos: (id: string) => void;
  handleEdit: (
    id: string,
    editedTask: string,
    editedDes: string,
    updateDt: Date | null
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
  createdDt: string;
  updateDt?: string;
}
