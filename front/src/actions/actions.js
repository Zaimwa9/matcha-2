import * as types from './actionTypes.js';
import axios from 'axios';

/*
  * receiveUsers est un 'action creator' au sens ou un action creator se contente de creer une action.
  * Ici de type receive users avec data comme objet
*/

export function checkAuthTrue(data) {
  return {
    data: data,
    type: types.AUTH_CHECK_TRUE
  }
}

export function checkAuthFalse() {
  return {
    type: types.AUTH_CHECK_FALSE
  }
}

export function signupRequest() {
  return {
    type: types.SIGNUP_REQUEST
  }
}

export function signupFailure(message) {
  return {
    error: {
      status: true,
      message: message
    },
    type: types.SIGNUP_FAILURE
  }
}

export function signupSuccess(data) {
  return {
    data: data,
    type: types.SIGNUP_SUCCESS
  }
}

export function updateField(name, value) {
  return {
    name: name,
    value: value,
    type: types.UPDATE_FIELD
  }
}

export function resetForm() {
  return {
    type: types.RESET_FORM
  }
}

export function loginRequest() {
  return {
    type: types.LOGIN_REQUEST,
  }
}

export function loginSuccess(data) {
  return {
    data: data,
    type: types.LOGIN_SUCCESS,
  }
}

export function loginFailure(message) {
  return {
    error : {
      status: true,
      message: message
    },
    type: types.LOGIN_FAILURE,
  }
}

export function signup(data) {
  /*
    * Une action de call a l'api sera plus verbeuse.
    * A son issue elle fait appelle a l'action qui recoit la donnee et qui mettra a jour le state
  */
  return dispatch => {
    dispatch(signupRequest());
    axios({
      url: 'http://localhost:3000/graphql/',
      method: 'post',
      headers: {
        'Protected': false,
        // 'Authorization': 'Bearer '+ localStorage.getItem('token')
      },
      data: {
        query: `
          mutation signup {
            signup(email: "${data.email}", password: "${data.password}", first_name: "${data.first_name}", last_name: "${data.last_name}") {
              uuid,
              first_name,
              last_name,
              email,
              description,
              token
            }
          }
        `
      }
    })
    .then(result => {
      if (!result.data.errors) {
        localStorage.setItem('token', result.data.data.signup.token);
        dispatch(signupSuccess(result.data.data.signup));
        dispatch(updateField('password', ''));
        dispatch(updateField('cpassword', ''));
      } else {
        dispatch(signupFailure('Email already in use!'))
        dispatch(updateField('password', ''));
        dispatch(updateField('cpassword', ''));
      }
    })
  }
}

export function login(data) {
  return dispatch => {
    dispatch(loginRequest());
    axios({
      url: 'http://localhost:3000/graphql/',
      method: 'post',
      headers: {
        'Protected': false,
        // 'Authorization': 'Bearer '+ localStorage.getItem('token')
      },
      data: {
        query: `
          mutation login {
            login(email: "${data.email}", password: "${data.password}") {
              uuid,
              first_name,
              last_name,
              email,
              token
            }
          }
        `
      }
    })
    .then(result => {
      if (!result.data.errors) {
        localStorage.setItem('token', result.data.data.login.token);
        dispatch(loginSuccess(result.data.data.login));
        dispatch(updateField('password', ''));
      } else {
        dispatch(loginFailure('Email already in use!'))
        dispatch(updateField('password', ''));
      }
    })
  }
}

export function isAuth() {
  return dispatch => {
    var token = localStorage.getItem('token');
    // S'il y a un token on verifie sa validite via la requete API
    if (token) {
      axios({
        url: 'http://localhost:3000/graphql/',
        method: 'post',
        headers: {
          'Authorization': 'Bearer '+ token
        },
        data: {
          query: `
            query {
              checkToken(token: "${token}") {
                first_name,
                last_name,
                email,
                uuid,
                gender,
                age
              }
            }
        `
        }
      })
      .then(result => {
        if (result.data.data.checkToken && result.data.data.checkToken.uuid) {
          dispatch(checkAuthTrue(result.data.data.checkToken));
        } else {
          dispatch(checkAuthFalse())
        }
      })
    } else {
      dispatch(checkAuthFalse())
    }
  }
}
