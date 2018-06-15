import * as types from './appActionTypes.js';
import axios from 'axios';

export function setActiveItem(activeItem) {
  return {
    activeItem: activeItem,
    type: types.ACTIVE_MENU_ITEM
  }
}

export function logout() {
  return {
    type: types.LOGOUT
  }
}

export function copyUser(user) {
  return {
    user: {...user, isFilled: true},
    type: types.COPY_USER
  }
}

export function setUpdateMode(status) {
  return {
    infoBlock: {
      updateMode: !status
    },
    type: types.SET_UPDATE_MODE
  }
}

export function updateUserField(user, name, value) {
  user[name] = value
  return {
    user: user,
    type: types.UPDATE_USER_FIELD
  }
}
