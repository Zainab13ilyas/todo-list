// sagas/rootSaga.ts

import { all } from "redux-saga/effects";
import { todoSagas } from "state/todos/Sagas";

export default function* rootSaga() {
  yield all([todoSagas()]);
}
// End of File (EOF)
