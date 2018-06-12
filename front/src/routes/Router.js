import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import NotFound from '../components/NotFound';
import RenderPublic from './PublicRoutes';
import RenderPrivate from './PrivateRoutes';
import LogBox from '../views/LogBox';
import Homepage from '../views/Homepage';

import { Loader } from 'semantic-ui-react';


function DecidePublicPrivate=> {

}

class Router extends Component {

  render() {
    if (this.props.checked !== false) {
      return (
        <BrowserRouter>
          <Switch>
            <RenderPrivate exact path='/' component={Homepage} location={this.props.location} />
            <RenderPublic exact path='/connexion' component={LogBox} location={this.props.location}/>
            <RenderPublic exact path='/login' component={LogBox} location={this.props.location}/>
            <RenderPublic exact path='/signup' component={LogBox} location={this.props.location}/>

              {/* <RenderPrivate exact path='/' component={Homepage} isAuth={this.props.user.isAuth} />
              <RenderPublic exact path='/connexion' component={LogBox} isAuth={this.props.user.isAuth} />
              <RenderPublic exact path='/login' component={LogBox} isAuth={this.props.user.isAuth} />
              <RenderPublic exact path='/signup' component={LogBox} isAuth={this.props.user.isAuth} /> */}
              <Route component={NotFound}></Route>
          </Switch>
        </BrowserRouter>
      )
    } else if (this.props.checked !== true) {
      return (
        <NotFound />
      )
    }
  }
}
// export default Router;
function mapStateToProps(state) {
  return {
    request: state.logSign.signupForm.submitted,
    checked: state.logSign.checked
  };
}

export default connect(
  mapStateToProps
)(Router);
