import {
  ACTIVE_MENU_ITEM,
  COPY_USER,
  LOGOUT,
  SET_UPDATE_MODE,
  UPDATE_USER_FIELD,
  USER_UPDATE_REQUEST
} from '../actions/appActionTypes';

const initialState = {
  user: {
    first_name: '',
    last_name: '',
    email: '',
    gender: 'Male',
    age: '',
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
  error: false
}

export default function appRed(state = initialState, action) {
  let newState;

  switch (action.type) {
    case USER_UPDATE_REQUEST:
      newState = {...state, requesting: true, error: false};
      return newState;
    case UPDATE_USER_FIELD:
      console.log(state)
      newState = {...state, user: {...action.user}};
    //  newState.user[action.name] = action.value;
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
