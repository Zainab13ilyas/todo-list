
import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { TodoActionTypes } from "state/todos/TodoActions"
import { Todo, crudAPI } from "components/Constants";

function* fetchTodosSaga(): any {
  try {
    const response = yield call(axios.get, crudAPI);
    const todos: Todo[] = response.data;
    yield put({ type: TodoActionTypes.FETCH_TODOS_SUCCESS, payload: { todos } });
  } catch (error: any) {
    yield put({ type: TodoActionTypes.FETCH_TODOS_FAILURE, payload: { error: error.message } });
  }
}

function* watchFetchTodos() {
  yield takeLatest(TodoActionTypes.FETCH_TODOS_REQUEST, fetchTodosSaga);
}

export function* todoSagas() {
  yield watchFetchTodos();
}
// End of File (EOF)
