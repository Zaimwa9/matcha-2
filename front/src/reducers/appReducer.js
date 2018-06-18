import {
  ACTIVE_MENU_ITEM,
  COPY_USER,
  LOGOUT,
  SET_UPDATE_MODE,
  UPDATE_USER_FIELD,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
  RESET_UPDATE,
  FETCH_HASHTAGS_SUCCESS,
  FETCH_HASHTAGS_FAILURE,
  ADD_HASHTAG,
  ADD_HASHTAG_FAILURE,
} from '../actions/appActionTypes';

const initialState = {
  user: {
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    age: '',
    hashtags: [],
    addinghash: '',
    isAuth: true,
    isFilled: false,
  },
  menu: {
    activeItem: '',
  },
  infoBlock: {
    updateMode: true,
  },
  requesting: false,
  error: false,
  error_message: '',
}

export default function appRed(state = initialState, action) {
  let newState;

  switch (action.type) {
    case RESET_UPDATE:
      newState = {...state, user: {...state.witness}};
      return newState;

    case ADD_HASHTAG:
      newState = {...state, user: {...state.user, addinghash: '', hashtags: [...state.user.hashtags, {...action.data}]}}
      return newState
    case ADD_HASHTAG_FAILURE:
      newState = {...state, error: true, error_message: action.error_message};
      return newState
    case FETCH_HASHTAGS_SUCCESS:
      newState = {...state, user: {...state.user, hashtags: [...action.hashtags]}, witness: {...state.witness, hashtags: [...action.hashtags]}}
      return newState;
    case FETCH_HASHTAGS_SUCCESS:
      console.log('ERROR');
      // newState = {...state, user: {...state.user, ...action.data}}
      return action;
    case USER_UPDATE_REQUEST:
      newState = {...state, requesting: true, error: false, error_message: ''};
      return newState;
    case USER_UPDATE_SUCCESS:
      newState = {...state, requesting: false, user: {...state.user, ...action.user}, witness: {...state.witness, ...action.user}};
      return newState;
    case USER_UPDATE_FAILURE:
      newState = {...state, requesting: false, error: true, error_message: action.error.message};
      return newState;

    case UPDATE_USER_FIELD:
      newState = {...state, user: {...action.user}};
      return newState;
    case COPY_USER:
      newState = {...state, user: {...action.user}, witness: {...action.user}};
      return newState;

    case ACTIVE_MENU_ITEM:
      newState = {...state};
      newState.menu.activeItem = action.activeItem
      return newState;
    case SET_UPDATE_MODE:
      newState = {...state, infoBlock: {...action.infoBlock}};
      return newState;

      case LOGOUT:
      newState = initialState;
      localStorage.removeItem('token');
      newState.user.isAuth = false;
      return newState;
    default:
      return state;
  }
}
