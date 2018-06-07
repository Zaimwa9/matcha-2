import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import LogBox from './components/LogBox';

import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// REDUX
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

import 'semantic-ui-css/semantic.min.css';

const store = configureStore();

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LogBox}></Route>
          <Route exact path='/login' component={LogBox}></Route>
          <Route exact path='/signup' component={LogBox}></Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

ReactDOM.render(
  <Root />,
  document.getElementById('root'));
registerServiceWorker();
