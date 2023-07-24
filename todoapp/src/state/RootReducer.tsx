import { combineReducers } from "redux";
import todoReducer from "state/todos/TodoReducer";
import { RootState } from "@components/Constants";

const rootReducer = combineReducers<RootState>({
  todo: todoReducer,
});

export default rootReducer;
// End of File (EOF)
