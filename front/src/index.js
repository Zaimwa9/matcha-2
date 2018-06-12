import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import thunk from 'redux-thunk';
// import App from './App';
// import LogBox from './views/LogBox';
// import NotFound from './components/NotFound';
// import MyAuth from './components/isAuthenticated';
import Router from './routes/Router';

import { loginSuccess, signupRequest, loggedIn } from './actions/actions';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch } from 'react-router-dom';
import axios from 'axios';

import rootReducer from './reducers/rootReducer';
import {createStore, applyMiddleware} from 'redux';
// REDUX
// import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

import jwtDecode from 'jwt-decode';

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
  componentWillMount() {
    if (localStorage.getItem('token')) {
    const uuid = jwtDecode(localStorage.getItem('token')).uuid;
    var token = localStorage.getItem('token');
    axios({
      url: 'http://localhost:3000/graphql/',
      method: 'post',
      headers: {
        'Authorization': 'Bearer '+ token
      },
      data: {
        query: `
          query {
            user(uuid: "${uuid}") {
              first_name,
              last_name,
              email,
              uuid,
              password
            }
          }
        `
      }
    })
    .then(result => {
      console.log(result.data.data);
      store.dispatch(loginSuccess(result.data.data.user));
    })
  } else {
    store.dispatch(loginSuccess()); // ICI IL FAUDRA METTRE UN TRUC DE PAS AUTH MAIS CHECKE
  }
}

  render () {
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
}

ReactDOM.render(
  <Root />,
  document.getElementById('root'));
registerServiceWorker();
