import { Dispatch, bindActionCreators } from "redux"
import { connect } from "react-redux";
import { RootState } from "components/Constants";
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  fetchTodosRequest,
  fetchTodosSuccess,
  fetchTodosFailure,
} from "state/todos/TodoActions";
import { setAlert, disableAlert } from "state/todos/AlertActions";
import Todos from "components/Todo";

const mapStateToProps = (state: RootState) => {
  return {
    todos: state.todo.todos,
    alertValue: state.alert.PopUpAlert,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      onAddTodo: addTodo,
      onDeleteTodo: deleteTodo,
      onToggleTodo: toggleTodo,
      onSetAlert: setAlert,
      onDisableAlert: disableAlert,
      fetchTodosSuccess: fetchTodosSuccess,
      fetchTodosFailure: fetchTodosFailure,
      fetchTodos: fetchTodosRequest
    },
    dispatch
  );
};

const TodosContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Todos);

export default TodosContainer;
// End of File (EOF)
