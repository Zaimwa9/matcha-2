import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import thunk from 'redux-thunk';

import Router from './routes/Router';

import registerServiceWorker from './registerServiceWorker';

import rootReducer from './reducers/rootReducer';
import { createStore, applyMiddleware } from 'redux';

import { Provider } from 'react-redux';
import client from './ApolloClient';
//import gql from "graphql-tag";

import 'semantic-ui-css/semantic.min.css';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

const Root = () => {
  return (
    <Provider store={store} client={client}>
      <Router client={client}/>
    </Provider>
  )
}

ReactDOM.render(
  <Root />,
  document.getElementById('root'));
registerServiceWorker();
