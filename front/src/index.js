import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import UsersList from './testRedux';
import App from './App';

import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// REDUX
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();

const Root = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={App}></Route>
        {/* <Route exact path='/courses' component={Courses}></Route> */}
      </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <UsersList />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
