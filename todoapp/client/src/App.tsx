import './App.css';
import TodosContainer from './containers/TodoContainer';
import { Provider } from 'react-redux';
import store from 'state/Store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <TodosContainer />
      </div>
    </Provider>

  );
}

export default App;
// End of File (EOF)
