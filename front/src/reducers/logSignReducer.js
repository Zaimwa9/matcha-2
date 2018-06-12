// import initialState from './initialState';

import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  UPDATE_FIELD,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  AUTH_CHECK,
  RESET_FORM
} from '../actions/actionTypes';

/*
  * Given the same arguments, it should calculate the next state and return it.
  * No surprises. No side effects. No API calls. No mutations. Just a calculation.
  * https://redux.js.org/basics/reducers
  * https://redux.js.org/basics/store
*/

const initialState = {
  user: {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    cpassword: '',
  },
  signupForm: {
    submitted: false,
    error: {
      status: false,
      message: null
    }
  }
}

export default function users(state = initialState, action) {
  let newState;

  switch (action.type) {
    case AUTH_CHECK:
      console.log(action.data);
      return action;
    case UPDATE_FIELD:
      newState = {...state};
      newState.user[action.name] = action.value;
      return newState;
    case RESET_FORM:
      newState = {...state};
      newState.signupForm = {...initialState.signupForm};
      newState.signupForm.error = {...initialState.signupForm.error};
      return newState;
    case SIGNUP_REQUEST:
      newState = {...state};
      newState.signupForm.submitted = true;
      newState.signupForm.error.status = false;
      return newState;
    case SIGNUP_SUCCESS:
      localStorage.setItem('token', action.data.token);
      newState = {...state};
      newState.signupForm.submitted = false;
      action.data.password = '';
      newState.user = {...action.data};
      return newState;
    case SIGNUP_FAILURE:
      newState = {...state};
      newState.signupForm.submitted = false;
      newState.signupForm.error = {...action.error}
      return newState;

    case LOGIN_REQUEST:
      newState= {...state};
      newState.signupForm.submitted = true;
      newState.signupForm.error.status = false;
      return newState;
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.data.token);
      newState = {...state};
      newState.signupForm.submitted = false;
      action.data.password = '';
      newState.user = {...action.data};
      return newState;
    case LOGIN_FAILURE:
      newState = {...state};
      newState.signupForm.submitted = false;
      newState.signupForm.error = {...action.error}
      return newState;
    default:

      return state;
  }
}