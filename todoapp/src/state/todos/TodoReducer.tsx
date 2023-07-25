import { TodoAction, TodoActionTypes } from "./TodoActions";
import { TodoState } from "components/Constants"

const initialState: TodoState = {
  todos: [],
};

const todoReducer = (state = initialState, action: TodoAction): TodoState => {
  switch (action.type) {
    case TodoActionTypes.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, { _id: action.payload.id, text: action.payload.text, completed: false }],
      };
    case TodoActionTypes.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case TodoActionTypes.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload.id),
      };
    case TodoActionTypes.EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._id === action.payload.id ? { ...todo, text: action.payload.text } : todo
        ),
      };
    case TodoActionTypes.FETCH_TODOS_SUCCESS:
      return {
        ...state,
        todos: action.payload.todos,
      };
    case TodoActionTypes.FETCH_TODOS_REQUEST:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default todoReducer;
// End of File (EOF)
