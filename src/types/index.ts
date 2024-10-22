//Main TodoInterface
export interface Todo {
  id: string;
  title: string;
  description: string;
  status: string;
  createdDt: Date;
  updateDt: Date | null;
}

//add data
export type TodoAddHandler = (
  title: string,
  description: string,
  date: Date
) => void;

//edit
export type TodoEditHandler = (
  id: string,
  editedTask: string,
  editedDesc: string,
  updateDt: Date | null
) => void;

//TodoPage
export interface TodoPageProps {
  todoAddHandler: TodoAddHandler;
  handleEdit: TodoEditHandler;
  onDeleteTodo: (id: string) => void;
  todos: Todo[];
}

//todoForm Add TodoHandler functionality
export interface OnAddTodo {
  handler: (title: string, Desc: string, date: Date) => void;
}

//TodoList
interface Items {
  id: string;
  title: string;
  description: string;
  status: string;
  createdDt: Date;
  updateDt: Date | null;
}

export interface TodoListProps {
  items: Items[]; // array of objects
  onDeleteTodos: (id: string) => void;
  handleEdit: (
    id: string,
    editedTask: string,
    editedDesc: string,
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

// Profile-view
export interface ProfileViewProps {
  userData: {
    name: string;
    email: string;
    picture: string;
  };
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClose: () => void;
  handleLogout: () => void;
}

//Error dialog
export interface ErrorDialogProps {
  open: boolean;
  message: string;
  onClose: () => void;
}
