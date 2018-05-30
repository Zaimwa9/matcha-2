import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Courses from './Courses';
import App from './App';

import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Root = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={App}></Route>
        <Route exact path='/courses' component={Courses}></Route>
      </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
