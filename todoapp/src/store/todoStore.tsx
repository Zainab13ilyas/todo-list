import { hookstate, useHookstate } from "@hookstate/core";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

const initialTodos: Todo[] = [];

const globalTodos = hookstate(initialTodos);

export const useGlobalState = () => {
  const todosState = useHookstate(globalTodos);

  return {
    todosState
  };
};
// End of File (EOF)
