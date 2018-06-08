// import initialState from './initialState';

import {
  FETCH_USERS,
  RECEIVE_USERS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
} from '../actions/actionTypes';

/*
  * Given the same arguments, it should calculate the next state and return it.
  * No surprises. No side effects. No API calls. No mutations. Just a calculation.
  * https://redux.js.org/basics/reducers
  * https://redux.js.org/basics/store
*/

const initialState = {
  user: {
    email: '',
    first_name: '',
    last_name: '',
    // password: 'test',
  },
  signupForm: {
    submitted: false,
    error: {
      status: false,
      message: 'salutatiosn'
    }
  }
}

export default function users(state = initialState, action) {
  let newState;

  switch (action.type) {
    case SIGNUP_REQUEST:
      newState = {... state};
      newState.signupForm.submitted = true;
      newState.signupForm.error.status = false;
      return newState;
    case SIGNUP_SUCCESS:
      localStorage.setItem('token', action.data.token);
      newState = {... state};
      newState.signupForm.submitted = false;
      newState.user = {... action.data};
      return newState;
    case SIGNUP_FAILURE:
      newState = {... state};
      newState.signupForm.error = {... action.error}
      return newState;
    case FETCH_USERS:
      return action;
    case RECEIVE_USERS:
      newState = action.users;
      console.log('RECEIVE_STUFF Action')
      return newState;
    default:
      return state;
  }
}