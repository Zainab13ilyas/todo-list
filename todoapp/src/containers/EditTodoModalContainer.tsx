import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux"
import { RootState } from "components/Constants";
import TodoModal from "components/EditTodoModal";
import { editTodo } from "state/todos/TodoActions";
import { setAlert, disableAlert } from "state/todos/AlertActions";


const mapStateToProps = (state: RootState) => {
  return {
    todos: state.todo.todos,
    alertValue: state.alert.PopUpAlert,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      onEditTodo: editTodo,
      onSetAlert: setAlert,
      onDisableAlert: disableAlert,
    },
    dispatch
  );
};

const EditTodoModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoModal);

export default EditTodoModalContainer;

// End of File (EOF)
