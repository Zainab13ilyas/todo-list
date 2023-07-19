import { hookstate, useHookstate } from "@hookstate/core";

export type Todo = {
  _id: string;
  text: string;
  completed: boolean;
};

const initialTodos: Todo[] = [];

const globalTodos = hookstate(initialTodos);

export const useGlobalState = () => {
  const tasksList = useHookstate(globalTodos);

  return {
    tasksList
  };
};
// End of File (EOF)
