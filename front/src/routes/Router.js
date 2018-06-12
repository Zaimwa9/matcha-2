import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import NotFound from '../components/NotFound';
import RenderPublic from './PublicRoutes';
import RenderPrivate from './PrivateRoutes';
import LogBox from '../views/LogBox';

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <RenderPrivate exact path='/' component={NotFound} isAuth={this.props.user.isAuth} />
          <RenderPublic exact path='/connexion' component={LogBox} isAuth={this.props.user.isAuth} />
          <RenderPublic exact path='/login' component={LogBox} isAuth={this.props.user.isAuth} />
          <RenderPublic exact path='/signup' component={LogBox} isAuth={this.props.user.isAuth} />
          <Route component={NotFound}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.logSign.user
  };
}

export default connect(
  mapStateToProps
)(Router);
