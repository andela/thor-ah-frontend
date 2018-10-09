import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';
import userIsLoggedIn from './utils/userIsLoggedIn';
import { logOutUser, setLoggedInUser } from './actions/auth';

const store = configureStore();

if (userIsLoggedIn()) {
  // set current user in store
  const user = JSON.parse(localStorage.user);
  store.dispatch(setLoggedInUser(user));
} else {
  store.dispatch(logOutUser());
}

// Wrapper component to render Provider.
const Main = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<Main />, document.getElementById('root'));

serviceWorker.unregister();
if (module.hot) module.hot.accept();
