import {
  ACTIVE_MENU_ITEM
} from '../actions/appActionTypes';

const initialState = {
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
    default:
      return state;
  }
}