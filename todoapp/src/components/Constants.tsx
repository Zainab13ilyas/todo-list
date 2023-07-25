export const crudAPI = "https://crudcrud.com/api/f918bc9749414520b3685961c0c4587a/todos"

export type Todo = {
  _id: string,
  text: string;
  completed: boolean
}
export interface TodoState {
  todos: Todo[];
}
export interface RootState {
  todo: TodoState;
  alert: AlertState;
}
export interface AlertState {
  PopUpAlert: boolean;
}
// End of File (EOF)
