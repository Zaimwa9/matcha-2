import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import LogBox from './views/LogBox';
// import NotFound from './components/NotFound';
// import MyAuth from './components/isAuthenticated';
import Router from './routes/Router';

import { loggedIn } from './actions/actions';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch } from 'react-router-dom';

// REDUX
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

import jwtDecode from 'jwt-decode';

import 'semantic-ui-css/semantic.min.css';

const store = configureStore();

const Root = () => {

  if (localStorage.getItem('token')) {
    store.dispatch(loggedIn(jwtDecode(localStorage.getItem('token')).uuid))
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Router />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

ReactDOM.render(
  <Root />,
  document.getElementById('root'));
registerServiceWorker();
