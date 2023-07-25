import { combineReducers } from "redux";
import todoReducer from "state/todos/TodoReducer";
import alertReducer from "state/todos/AlertReducer";
import { RootState } from "@components/Constants";

const rootReducer = combineReducers<RootState>({
  todo: todoReducer,
  alert: alertReducer,
});

export default rootReducer;
// End of File (EOF)
