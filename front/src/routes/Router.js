import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';

import NotFound from '../components/NotFound';
import RenderPublic from './PublicRoutes';
import RenderPrivate from './PrivateRoutes';
import LogBox from '../views/LogBox';
import Homepage from '../views/Homepage';
import LoadingPage from '../components/LoadingPage';

class Router extends Component {
  componentWillMount() {
    this.props.actions.isAuth();
  }

  renderRouter = () => {
    if (this.props.user.isAuth === false) {
      return (
        <Switch>
          <RenderPublic exact path='/' component={LogBox} location={this.props.location} />
          <RenderPublic exact path='/login' component={LogBox} location={this.props.location} />
          <RenderPublic exact path='/signup' component={LogBox} location={this.props.location} />
          <Route component={NotFound}></Route>
        </Switch>
      )
    } else {
      return (
        <Switch>
          <RenderPrivate exact path='/' component={Homepage} location={this.props.location} />
          <RenderPrivate exact path='/profile' component={Homepage} location={this.props.location} />
          <Route component={NotFound}></Route>
        </Switch>
      )
    }
  }

  render() {
    if (this.props.checked === true) {
      return (
        <BrowserRouter>
          {this.renderRouter()}
        </BrowserRouter>
      )
    } else if (this.props.checked === false) {
      return (
        <LoadingPage />
      )
    }
  }
}
// export default Router;
function mapStateToProps(state) {
  return {
    user: state.logSign.user,
    checked: state.logSign.checked
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Router);
