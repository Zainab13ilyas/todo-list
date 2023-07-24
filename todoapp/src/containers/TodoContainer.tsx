import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, crudAPI } from "components/Constants";
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  fetchTodosRequest,
  fetchTodosSuccess,
  fetchTodosFailure,
} from "state/todos/TodoActions";
import Todos from "components/Todo";
import axios from "axios";

const TodosContainer = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo.todos);

  useEffect(() => {
    dispatch(fetchTodosRequest());
    fetchTodos();
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchTodos = async () => {
    try {
      const response = await axios.get(crudAPI);
      const todos = response.data;
      dispatch(fetchTodosSuccess(todos));
    } catch (error: any) {
      console.error(error);
      dispatch(fetchTodosFailure(error.message));
    }
  };

  const handleAddTodo = (id: string, text: string) => {
    dispatch(addTodo(id, text));
    fetchTodos()
  };

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
    fetchTodos()
  };

  const handleToggleTodo = (id: string) => {
    dispatch(toggleTodo(id));
    fetchTodos()
  };

  return (
    <Todos
      todos={todos}
      onAddTodo={handleAddTodo}
      onDeleteTodo={handleDeleteTodo}
      onToggleTodo={handleToggleTodo}
    />
  );
};

export default TodosContainer;
// End of File (EOF)
