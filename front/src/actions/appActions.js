import * as types from './appActionTypes.js';
import axios from 'axios';
import _ from 'lodash';

export function updateUserRequest(data) {
  return {
    type: types.USER_UPDATE_REQUEST
  }
}

export function updateUserFailure(error) {
  return {
    error: error,
    type: types.USER_UPDATE_FAILURE
  }
}

export function resetUpdate() {
  return {
    type: types.RESET_UPDATE
  }
}

export function updateUserSuccess(data) {
  return {
    user: {...data},
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
    console.log(data)
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
            updateUser(age: ${data.age}, email: "${data.email}", first_name: "${data.first_name}", last_name: "${data.last_name}", gender: "${data.gender}", uuid: "${data.uuid}") {
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
        console.log(result.data.errors);
        dispatch(updateUserFailure(result.data.errors[0]))
      }
    })
  }
}

export function fetchHashSuccess(data) {
  return {
    pictures: data.pictures,
    hashtags: data.hashtags,
    type: types.FETCH_HASHTAGS_SUCCESS
  }
}

export function fetchHashFailure(error) {
  return {
    error: error,
    type: types.FETCH_HASHTAGS_FAILURE
  }
}

export function fetchHashtags(uuid) {
  return dispatch => {
    axios({
      url: 'http://localhost:3000/graphql/',
      method: 'post',
      headers: {
        'Protected': false,
        // 'Authorization': 'Bearer '+ localStorage.getItem('token')
      },
      data: {
        query: `
          query user {
            user(uuid: "${uuid}") {
              hashtags {
                id,
                content
              },
              pictures {
                id,
                path,
                posted_at
              }
            }
          }
        `
      }
    })
    .then(result => {
      if (!result.data.errors) {
        dispatch(fetchHashSuccess(result.data.data.user))
      } else {
        console.log(result.data.errors);
        dispatch(fetchHashFailure(result.data.errors[0]))
      }
    })
  }
}

export function hashAdded(data) {
  return {
    data: data.addHashtag,
    type: types.ADD_HASHTAG
  }
}

export function hashFailed(error) {
  return {
    error_message: error,
    type: types.ADD_HASHTAG_FAILURE
  }
}

export function postHashtag(data, currentHashes) {
  return dispatch => {
    var flag = false;
    _.find(currentHashes, item => {
      if (item.content === data.content) {
        flag = true;
      }
    })
    if (flag === false) {
      axios({
        url: 'http://localhost:3000/graphql/',
        method: 'post',
        headers: {
          'Protected': false,
          // 'Authorization': 'Bearer '+ localStorage.getItem('token')
        },
        data: {
          query: `
            mutation addHashtag {
              addHashtag(uuid: "${data.uuid}", content: "${data.content}") {
                id,
                content
              }
            }
          `
        }
      })
      .then(result => {
        if (!result.data.errors) {
          dispatch(hashAdded(result.data.data))
        } else {
          console.log(result.data.errors);
          dispatch(hashFailed(result.data.errors[0]))
        }
      })
    } else {
      console.log('duplicate');
      dispatch(hashFailed('Duplicate hashtag'));
    }
  }
}

export function deleteHashtagSuccess(key, hashtags) {
  return {
    key: key,
    hashtags: _.filter(hashtags, (item) => item.id !== key),
    type: types.DELETE_HASHTAG_SUCCESS
  }
}

export function deleteHashtagFailure(error) {
  return {
    error_message: error,
    type: types.DELETE_HASHTAG_FAILURE
  }
}

export function deleteHashtag(key, hashtags) {
  return dispatch => {
    axios({
      url: 'http://localhost:3000/graphql/',
      method: 'post',
      headers: {
        'Protected': false,
        // 'Authorization': 'Bearer '+ localStorage.getItem('token')
      },
      data: {
        query: `
          mutation deleteHashtag {
            deleteHashtag(id: ${key}) {
              id,
              content
            }
          }
        `
      }
    })
    .then(result => {
      console.log(result)
      if (!result.data.errors) {
        dispatch(deleteHashtagSuccess(key, hashtags))
      } else {
        console.log(result.data.errors);
        dispatch(deleteHashtagFailure(result.data.errors[0]))
      }
    })
  }
}

export function uploadPictureRequest(data) {
  console.log(data);
  return {
    type: types.UPLOAD_PICTURE_REQUEST
  }
}

export function uploadPictureSuccess(file, blob) {
  return {
    picture: {
      id: file.id,
      src: blob.preview
    },
    type: types.UPLOAD_PICTURE_SUCCESS
  }
}

export function uploadPictureFailure() {
  return {
    type: types.UPLOAD_PICTURE_FAILURE
  }
}

export function postPictureUpload(file, uuid) {
  return dispatch => {
    dispatch(uploadPictureRequest(file))
    const formData = new FormData();
    formData.append('file', file);
    formData.append('uuid', uuid);
    fetch('http://localhost:3000/upload' , {
      method: 'POST',
      body: formData
    }).then(result => {
      if (result.status === 200) {
        return result.json();
      } else {
        dispatch(uploadPictureFailure());
      }
    }).then(data => {
        if (data && data.data) {
          dispatch(uploadPictureSuccess(data, file))
        }
    })
  }
}
