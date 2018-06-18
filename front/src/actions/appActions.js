import * as types from './appActionTypes.js';
import axios from 'axios';

export function updateUserRequest(data) {
  return {
    type: types.USER_UPDATE_REQUEST
  }
}

export function updateUserFailure(error) {
  console.log(error);
  return {
    error: error,
    type: types.USER_UPDATE_FAILURE
  }
}

export function updateUserSuccess(data) {
  console.log(data);
  return {
    user: data.user,
    type: types.USER_UPDATE_SUCCESS
  }
}

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

export function submitUpdateUser(data) {
  return dispatch => {
    dispatch(updateUserRequest());
    axios({
      url: 'http://localhost:3000/graphql/',
      method: 'post',
      headers: {
        'Protected': false,
        // 'Authorization': 'Bearer '+ localStorage.getItem('token')
      },
      data: {
        query: `
          mutation updateUser {
            updateUser(email: "${data.email}", first_name: "${data.first_name}", last_name: "${data.last_name}", gender: "${data.gender}", uuid: "${data.uuid}") {
              uuid,
              first_name,
              last_name,
              email,
              gender
            }
          }
        `
      }
    })
    .then(result => {
      if (!result.data.errors) {
        console.log('success');
        dispatch(updateUserSuccess(result.data.data.updateUser))
      } else {
        console.log('fail');
        dispatch(updateUserFailure(result.data.data.updateUser))
      }
    })
  }
}