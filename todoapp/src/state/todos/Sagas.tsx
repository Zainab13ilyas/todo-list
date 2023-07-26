
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

function* addTodoSaga(action: { type: string, payload: { text: string } }): Generator<any, void, any> {
  const newTodo = {
    text: action.payload.text,
    completed: false,
  };
  try {
    const response = yield call(axios.post, crudAPI, newTodo);
    const createdTodo = response.data; // Assuming the API returns the newly created todo with its id
    yield put({ type: TodoActionTypes.ADD_TODO_SUCCESS, payload: { todo: createdTodo } });
  } catch (error) {
    console.error(error);
  }
}

function* deleteTodoSaga(action: { type: string, payload: { id: string } }) {
  try {
    const { id } = action.payload;
    yield call(axios.delete, `${crudAPI}/${id}`);
  } catch (error: any) {
    console.error(error)
  }
}

function* updateTodoSaga(action: { type: string, payload: { id: string, text: string, completed: boolean } }) {
  try {
    const { id, completed, text } = action.payload;
    const updatedTodo: Partial<Todo> = { completed, text }
    yield call(axios.put, `${crudAPI}/${id}`, updatedTodo, {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error(error)
  }

}
function* toggleTodoSaga(action: { type: string, payload: { id: string, text: string, completed: boolean } }) {
  try {
    const { id, completed, text } = action.payload;
    const updatedTodo: Partial<Todo> = { completed: !completed, text }
    console.log(updatedTodo)
    yield call(axios.put, `${crudAPI}/${id}`, updatedTodo, {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error(error)
  }

}

function* watchFetchTodos() {
  yield takeLatest(TodoActionTypes.FETCH_TODOS_REQUEST, fetchTodosSaga);
  yield takeLatest(TodoActionTypes.ADD_TODO, addTodoSaga);
  yield takeLatest(TodoActionTypes.DELETE_TODO, deleteTodoSaga);
  yield takeLatest(TodoActionTypes.EDIT_TODO, updateTodoSaga);
  yield takeLatest(TodoActionTypes.TOGGLE_TODO, toggleTodoSaga);
}
export function* todoSagas() {
  yield watchFetchTodos();
}
// End of File (EOF)
