import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import Router from './routes';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';


function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
