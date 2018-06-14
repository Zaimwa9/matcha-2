import {
  ACTIVE_MENU_ITEM,
  COPY_USER,
  LOGOUT
} from '../actions/appActionTypes';

const initialState = {
  user: {
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    age: '',
    isAuth: true,
  },
  menu: {
    activeItem: '',
  }
}

export default function appRed(state = initialState, action) {
  let newState;

  switch (action.type) {
    case ACTIVE_MENU_ITEM:
      newState = {...state};
      newState.menu.activeItem = action.activeItem
      return newState;
    case LOGOUT:
      newState = initialState;
      localStorage.removeItem('token');
      newState.user.isAuth = false;
      return newState;
    case COPY_USER:
      newState = {...state, user: {...action.user}};
      return newState;
    default:
      return state;
  }
}