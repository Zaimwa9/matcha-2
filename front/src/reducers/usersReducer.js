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
    users : {
    email: 'test',
    password: 'test',
    first_name: 'test',
    last_name: 'test',
    isSubmitted: false,
    error: null
  }
}

export default function users(state = initialState, action) {
  let newState = action.data;
  switch (action.type) {
    case SIGNUP_REQUEST:
      console.log(action);
      newState = action.data;
      newState.isSigning = true;
      return newState;
    case SIGNUP_SUCCESS:
      return action;
    case SIGNUP_FAILURE:
      return action;
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