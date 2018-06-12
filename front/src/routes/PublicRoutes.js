import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const RenderPublic = function ({component: Component, isAuth, ...rest }) {
console.log(isAuth);
  return (
    <Route
      {...rest}
      render={(props) => !isAuth
      ? <Component {...props} />
      : <Redirect to={{pathname: '/'}} />}
    />
  )
}

export default RenderPublic;