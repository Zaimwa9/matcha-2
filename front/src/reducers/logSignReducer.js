import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  UPDATE_FIELD,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  AUTH_CHECK_TRUE,
  AUTH_CHECK_FALSE,
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
    isAuth: false
  },
  signupForm: {
    submitted: false,
    error: {
      status: false,
      message: null
    }
  },
  checked: false,
}

export default function users(state = initialState, action) {
  let newState;

  switch (action.type) {
    case AUTH_CHECK_TRUE:
      newState = {...state};
      newState.user = {...action.data};
      newState.user.isAuth = true;
      newState.checked = true;
      return newState;
    case AUTH_CHECK_FALSE:
      newState = {...state};
      newState.user = {...action.data};
      newState.user.isAuth = false;
      newState.checked = true;
      return newState;

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
      newState = {...state};
      newState.signupForm.submitted = false;
      action.data.password = '';
      newState.user = {...action.data};
      newState.user.isAuth = true;
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