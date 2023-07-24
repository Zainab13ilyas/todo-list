import { useDispatch, useSelector } from "react-redux";
import { RootState } from "components/Constants";
import TodoModal from "components/EditTodoModal";
import { editTodo } from "state/todos/TodoActions";

type TodoModalContainerProps = {
  todoId: string | null;
  handleCloseModal: () => void;
}
const TodoModalContainer = ({ todoId, handleCloseModal }: TodoModalContainerProps) => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo.todos);

  const handleUpdate = (todoId: string, text: string) => {
    dispatch(editTodo(todoId, text));
  }

  return <TodoModal todoId={todoId} handleCloseModal={handleCloseModal} todos={todos} onEditTodo={handleUpdate} />;
};

export default TodoModalContainer;
// End of File (EOF)
