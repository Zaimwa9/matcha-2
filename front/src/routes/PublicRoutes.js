import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const RenderPublic = function ({component: Component, isAuth, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => !isAuth
      ? <Component {...props} />
      : <Redirect push to={{pathname: '/'}} />}
    />
  )
}

function mapStateToProps(state) {
  return {
    isAuth: state.logSign.user.isAuth
  };
}
// export default RenderPublic;
export default connect(mapStateToProps)(RenderPublic)