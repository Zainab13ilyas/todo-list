export const crudAPI = "https://crudcrud.com/api/ffeec4daa4c54c848461521f2e01c580/todos"

export type Todo = {
  _id: string,
  text: string;
  completed: boolean
}
export interface TodoState {
  todos: Todo[];
}
export interface AlertState {
  popUpAlert: boolean;
}
export interface RootState {
  todo: TodoState;
  alert: AlertState;
}

// End of File (EOF)
