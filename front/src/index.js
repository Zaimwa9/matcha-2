import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import LogBox from './views/LogBox';
import NotFound from './components/NotFound';
import { isAuth, login } from './actions/actions';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// REDUX
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

import 'semantic-ui-css/semantic.min.css';

const store = configureStore();

const Root = () => {
  isAuth();
  login({email: 'diwadoo', password: 'diwadoo'});
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LogBox}></Route>
          <Route exact path='/login' component={LogBox}></Route>
          <Route exact path='/signup' component={LogBox}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

ReactDOM.render(
  <Root />,
  document.getElementById('root'));
registerServiceWorker();
