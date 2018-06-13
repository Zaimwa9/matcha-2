import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import thunk from 'redux-thunk';

import Router from './routes/Router';

import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch } from 'react-router-dom';

import rootReducer from './reducers/rootReducer';
import { createStore, applyMiddleware } from 'redux';

import { Provider } from 'react-redux';

import 'semantic-ui-css/semantic.min.css';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

// if (localStorage.getItem('token')) {
//   const uuid = jwtDecode(localStorage.getItem('token')).uuid;
//   store.dispatch(loggedIn(uuid));
// }

// const Root = () => {
//   return (
//     <Provider store={store}>
//       <BrowserRouter>
//         <Switch>
//            <Router />
//         </Switch>
//       </BrowserRouter>
//     </Provider>
//   )
// }


class Root extends Component {

  render () {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('root'));
registerServiceWorker();
