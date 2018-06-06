import initialState from './initialState';
import {FETCH_USERS, RECEIVE_USERS} from '../actions/actionTypes';

export default function users(state = initialState.users, action) {
  let newState;
  switch (action.type) {
    case FETCH_USERS:
      console.log('FETCH_STUFF Action')
      return action;
    case RECEIVE_USERS:
      newState = action.users;
      console.log('RECEIVE_STUFF Action')
      return newState;
    default:
      return state;
  }
}