import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const RenderPrivate = function ({component: Component, isAuth, ...rest }) {

  return (
    <Route
      {...rest}
      render={(props) => isAuth
      ? <Component {...props} />
      : <Redirect push to={{pathname: '/connexion'}} />}
    />
  )
}

function mapStateToProps(state) {
  return {
    isAuth: state.logSign.user.isAuth,
    request: state.logSign.signupForm.submitted
  };
}

// export default RenderPrivate;
export default connect(mapStateToProps)(RenderPrivate)