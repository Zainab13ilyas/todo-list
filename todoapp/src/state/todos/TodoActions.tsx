import { Todo } from 'components/Constants'

export enum TodoActionTypes {
  ADD_TODO = "ADD_TODO",
  ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS",
  TOGGLE_TODO = "TOGGLE_TODO",
  DELETE_TODO = "DELETE_TODO",
  EDIT_TODO = "EDIT_TODO",
  FETCH_TODOS_REQUEST = "FETCH_TODOS_REQUEST",
  FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS",
  FETCH_TODOS_FAILURE = "FETCH_TODOS_FAILURE",
}

interface AddTodoAction {
  type: TodoActionTypes.ADD_TODO;
  payload: {
    text: string;
  };
}
interface AddTodoSuccessAction {
  type: TodoActionTypes.ADD_TODO_SUCCESS;
  payload: {
    todo: Todo;
  };
}


interface ToggleTodoAction {
  type: TodoActionTypes.TOGGLE_TODO;
  payload: {
    id: string;
    text: string;
    completed: boolean;
  };
}

interface DeleteTodoAction {
  type: TodoActionTypes.DELETE_TODO;
  payload: {
    id: string;
  };
}
/*interface DeleteTodoSuccessAction {
  type: TodoActionTypes.DELETE_TODO_SUCCESS;
  payload: {
    todos: Todo[];
  };
}
interface DeleteTodoFailureAction {
  type: TodoActionTypes.DELETE_TODO_FAILURE;
  payload: {
    error: string;
  };
}*/
interface EditTodoAction {
  type: TodoActionTypes.EDIT_TODO;
  payload: {
    id: string;
    text: string;
    completed: boolean;
  };
}

interface FetchTodosRequestAction {
  type: TodoActionTypes.FETCH_TODOS_REQUEST;
}

interface FetchTodosSuccessAction {
  type: TodoActionTypes.FETCH_TODOS_SUCCESS;
  payload: {
    todos: Todo[];
  };
}

interface FetchTodosFailureAction {
  type: TodoActionTypes.FETCH_TODOS_FAILURE;
  payload: {
    error: string;
  };
}

export type TodoAction =
  | AddTodoAction
  | AddTodoSuccessAction
  | ToggleTodoAction
  | DeleteTodoAction
  | EditTodoAction
  | FetchTodosRequestAction
  | FetchTodosSuccessAction
  | FetchTodosFailureAction;

export const addTodo = (text: string): AddTodoAction => ({
  type: TodoActionTypes.ADD_TODO,
  payload: { text },
});

export const addTodoSuccess = (todo: Todo): AddTodoSuccessAction => ({
  type: TodoActionTypes.ADD_TODO_SUCCESS,
  payload: {
    todo,
  },
});

export const toggleTodo = (id: string, text: string, completed: boolean): ToggleTodoAction => ({
  type: TodoActionTypes.TOGGLE_TODO,
  payload: { id, text, completed },
});

export const deleteTodo = (id: string): DeleteTodoAction => ({
  type: TodoActionTypes.DELETE_TODO,
  payload: { id },
});

export const editTodo = (id: string, text: string, completed: boolean): TodoAction => ({
  type: TodoActionTypes.EDIT_TODO,
  payload: { id, text, completed },
});

export const fetchTodosRequest = (): FetchTodosRequestAction => ({
  type: TodoActionTypes.FETCH_TODOS_REQUEST,
});

export const fetchTodosSuccess = (todos: Todo[]): FetchTodosSuccessAction => ({
  type: TodoActionTypes.FETCH_TODOS_SUCCESS,
  payload: { todos },
});

export const fetchTodosFailure = (error: string): FetchTodosFailureAction => ({
  type: TodoActionTypes.FETCH_TODOS_FAILURE,
  payload: { error },
});
// End of File (EOF)
