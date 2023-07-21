import { hookstate, useHookstate } from "@hookstate/core";
import { Todo } from 'components/Constants'

const initialTodos: Todo[] = [];

const globalTodos = hookstate(initialTodos);

export const useGlobalState = () => {
  const tasksList = useHookstate(globalTodos);

  return {
    tasksList
  };
};
// End of File (EOF)
