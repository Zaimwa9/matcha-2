import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const RenderPrivate = function ({component: Component, isAuth, ...rest }) {

  return (
    <Route
      {...rest}
      render={(props) => isAuth
      ? <Component {...props} />
      : <Redirect to={{pathname: '/connexion'}} />}
    />
  )
}

export default RenderPrivate;