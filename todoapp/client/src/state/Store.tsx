import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from "redux-saga";
import RootReducer from "./RootReducer";
import rootSaga from "state/RootSaga";
import { RootState } from '@components/Constants';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore<RootState>({
  reducer: RootReducer,
  middleware: () => [sagaMiddleware]
});
sagaMiddleware.run(rootSaga);


export default store;
// End of File (EOF)
