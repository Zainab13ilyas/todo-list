export const crudAPI = "https://crudcrud.com/api/5cf7428ca56444a485d7ee9c83ae593c/todos"

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
}
// End of File (EOF)
