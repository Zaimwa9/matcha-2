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

export function pictureManageMode(status) {
  return {
    pictureBlock: {
      manageMode: !status
    },
    type: types.MANAGE_PICTURE_MODE,
  }
}

export function setEditingMode(status, reset = null) {
  var finalStatus = reset !== null ? false : !status;
  return {
    descBlock: {
      editMode: finalStatus
    },
    type: types.SET_EDITING_MODE,
  }
}

export function updateUserField(user, name, value) {
  user[name] = value
  return {
    user: user,
    type: types.UPDATE_USER_FIELD
  }
}

export function updatePwd(name, value) {
  let updatePwd = [];
  updatePwd[name] = value
  return {
    updatePwd: updatePwd,
    type: types.UPDATE_PWD
  }
}

export function submitUpdateUser(data) {
  return dispatch => {
    data.age = data.age ? data.age : 663807600;
    dispatch(updateUserRequest());
    axios({
      url: 'http://localhost:3000/graphql/',
      method: 'post',
      headers: {
        'Protected': false,
        // 'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      data: {
        query: `
          mutation updateUser {
            updateUser(age: ${data.age}, orientation: "${data.orientation}", email: "${data.email}", first_name: "${data.first_name}", last_name: "${data.last_name}", gender: "${data.gender}", uuid: "${data.uuid}", address: "${data.address}", lat: "${data.lat}", lng: "${data.lng}") {
              uuid,
              first_name,
              last_name,
              address,
              lng,
              lat,
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
    address: data.address,
    description: data.description,
    pictures: data.pictures,
    hashtags: data.hashtags,
    orientation: data.orientation,
    age: data.age,
    gender: data.gender,
    lat: data.lat,
    lng: data.lng,
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
              description,
              address,
              lat,
              age,
              lng,
              gender,
              orientation,
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
  return {
    type: types.UPLOAD_PICTURE_REQUEST
  }
}

export function uploadPictureSuccess(file, blob) {
  return {
    picture: {
      id: file.id,
      path: file.path,
      posted_at: file.posted_at
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
          console.log(data);
          dispatch(uploadPictureSuccess(data.data, file))
        }
    })
  }
}

export function deletePictureSuccess(key, pictures) {
  return {
    key: key,
    pictures: _.filter(pictures, (item) => item.id !== key),
    type: types.DELETE_PICTURE_SUCCESS
  }
}

export function deletePictureFailure(error) {
  return {
    error_message: error,
    type: types.DELETE_PICTURE_FAILURE
  }
}

export function deletePicture(key, pictures) {
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
          mutation deletePicture {
            deletePicture(id: ${key}) {
              id,
              author_uuid,
            }
          }
        `
      }
    })
    .then(result => {
      console.log(result)
      if (!result.data.errors) {
        dispatch(deletePictureSuccess(key, pictures))
      } else {
        console.log(result.data.errors);
        dispatch(deletePictureFailure(result.data.errors[0]))
      }
    })
  }
}

export function updateDescriptionSuccess(data) {
  return {
    description: data.description,
    type: types.UPDATE_DESCRIPTION_SUCCESS
  }
}

export function updateDescriptionFailure() {
  return {
    type: types.UPDATE_DESCRIPTION_FAILURE
  }
}

export function postDescription(uuid, description) {
  description = description.replace(/\n$/, '');
  description = description.replace("'", "''")
  return dispatch => {
    axios({
      url: 'http://localhost:3000/graphql/',
      method: 'post',
      headers: {
        'Protected': false,
        // 'Authorization': 'Bearer '+ localStorage.getItem('token')
      },
      data: {
        query:
        `
          mutation updateDescription {
            updateDescription(uuid: "${uuid}", description: "${description}") {
            	uuid,
            	description,
              email,
            }
          }
        `
      }
    })
    .then(result => {
      if (!result.data.errors) {
        dispatch(updateDescriptionSuccess(result.data.data.updateDescription))
      } else {
        console.log(result.data.errors);
        dispatch(updateDescriptionFailure(result.data.errors[0]))
      }
    })
  }
}

export function submitPwdSuccess(data) {
  return {
    type: types.SUBMIT_PWD_SUCCESS
  }
}

export function submitPwdFailure(error) {
  return {
    error_message: error,
    type: types.SUBMIT_PWD_FAILURE
  }
}

export function submitPwdUpdate(uuid, oldPwd, newPwd) {
  return dispatch => {
    axios({
      url: 'http://localhost:3000/graphql/',
      method: 'post',
      headers: {
        'Protected': false,
        // 'Authorization': 'Bearer '+ localStorage.getItem('token')
      },
      data: {
        query:
        `
          mutation updatePwd {
            updatePwd(uuid: "${uuid}", oldPwd: "${oldPwd}", newPwd: "${newPwd}") {
            	uuid
            }
          }
        `
      }
    })
    .then(result => {
      if (!result.data.errors) {
        dispatch(submitPwdSuccess(result.data.data.updatePwd))
      } else {
        console.log(result.data.errors);
        dispatch(submitPwdFailure(result.data.errors[0]))
      }
    })
  }
}

export function fetchUsersRequest() {
  return {
    type: types.FETCH_USERS_REQUEST
  }
}

export function fetchUsersSuccess(profiles) {
  return {
    profiles: profiles,
    type: types.FETCH_USERS_SUCCESS
  }
}

export function fetchUsersFailure(error) {
  return {
    error_message: error,
    type: types.FETCH_USERS_FAILURE
  }
}

export function fetchFeedUsers(uuid) {
  return dispatch => {
    dispatch(fetchUsersRequest());
    axios({
      url: 'http://localhost:3000/graphql/',
      method: 'post',
      headers: {
        'Protected': false,
        // 'Authorization': 'Bearer '+ localStorage.getItem('token')
      },
      data: {
        query:
        `
          query feedUsers {
            feedUsers (uuid: "${uuid}") {
              uuid,
              active,
              id,
              distance,
              first_name,
              last_name,
              gender,
              age,
              address,
              description,
              popularity,
              is_liked,
              count_hashtags,
              likesyou,
              hashtags {
                content
              },
              pictures {
                id,
                path
              }
            }
          }
        `
      }
    })
    .then(result => {
      if (!result.data.errors) {
        dispatch(fetchUsersSuccess(result.data.data.feedUsers))
      } else {
        console.log(result.data.errors);
        dispatch(fetchUsersFailure(result.data.errors[0]))
      }
    })
  }
}

export function fetchFeedVisits(uuid) {
  return dispatch => {
    dispatch(fetchUsersRequest());
    axios({
      url: 'http://localhost:3000/graphql/',
      method: 'post',
      headers: {
        'Protected': false,
        // 'Authorization': 'Bearer '+ localStorage.getItem('token')
      },
      data: {
        query:
        `
          query visitUsers {
            visitUsers (uuid: "${uuid}") {
              uuid,
              id,
              distance,
              first_name,
              last_name,
              gender,
              age,
              address,
              description,
              popularity,
              is_liked,
              count_hashtags,
              likesyou,
              hashtags {
                content
              },
              pictures {
                id,
                path
              }
            }
          }
        `
      }
    })
    .then(result => {
      if (!result.data.errors) {
        dispatch(fetchUsersSuccess(result.data.data.visitUsers))
      } else {
        console.log(result.data.errors);
        dispatch(fetchUsersFailure(result.data.errors[0]))
      }
    })
  }
}

export function newVisit(visited_uuid) {
  return (dispatch, getState) => {
    const visitor_uuid = getState().app.user.uuid;
    axios({
      url: 'http://localhost:3000/graphql/',
      method: 'post',
      headers: {
        'Protected': false,
        // 'Authorization': 'Bearer '+ localStorage.getItem('token')
      },
      data: {
        query:
        `
          mutation newVisit {
            newVisit(visitor_uuid: "${visitor_uuid}", visited_uuid: "${visited_uuid}") {
              visited_uuid,
              visitor_uuid,
              visited_at
            }
          }
        `
      }
    })
    .then(result => {
      if (!result.data.errors) {
        console.log('visit added')
      } else {
        console.log(result.data.errors);
      }
    })
  }
}

export function reportUser(uuid) {
  return (dispatch, getState) => {
    const reporter_uuid = getState().app.user.uuid;
    axios({
      url: 'http://localhost:3000/graphql/',
      method: 'post',
      headers: {
        'Protected': false,
        // 'Authorization': 'Bearer '+ localStorage.getItem('token')
      },
      data: {
        query:
        `
          mutation reportUser {
            reportUser(uuid: "${uuid}", reporter_uuid: "${reporter_uuid}") {
              uuid,
              reporter_uuid,
              reported_at
            }
          }
        `
      }
    })
    .then(result => {
      if (!result.data.errors) {
        console.log('reported')
      } else {
        console.log(result.data.errors);
      }
    })
  }
}

export function userBlocked(blocked_uuid, feed) {
  _.remove(feed.profiles, item => {
    return item.uuid === blocked_uuid;
  })
  return {
    feed: feed,
    type: types.BLOCKED_USER
  }
}

export function blockUser(blocked_uuid) {
  return (dispatch, getState) => {
    const uuid = getState().app.user.uuid;
    const feed = getState().app.feed;
    axios({
      url: 'http://localhost:3000/graphql/',
      method: 'post',
      headers: {
        'Protected': false,
        // 'Authorization': 'Bearer '+ localStorage.getItem('token')
      },
      data: {
        query:
        `
          mutation blockUser {
            blockUser(uuid: "${uuid}", blocked_uuid: "${blocked_uuid}") {
              uuid,
              blocked_uuid,
              blocked_at
            }
          }
        `
      }
    })
    .then(result => {
      if (!result.data.errors) {
        dispatch(userBlocked(blocked_uuid, feed));
        console.log('blocked')
      } else {
        console.log(result.data.errors);
      }
    })
  }
}

export function userLiked(liked_uuid, feed) {
  const index = _.findIndex(feed.profiles, item => {
    return item.uuid === liked_uuid;
  })
  feed.profiles[index].is_liked = 1;
  return {
    feed: feed,
    type: types.LIKED_USER
  }
}

export function likeUser(liked_uuid) {
  return (dispatch, getState) => {
    const liker_uuid = getState().app.user.uuid;
    const feed = getState().app.feed;
    axios({
      url: 'http://localhost:3000/graphql/',
      method: 'post',
      headers: {
        'Protected': false,
        // 'Authorization': 'Bearer '+ localStorage.getItem('token')
      },
      data: {
        query:
        `
          mutation likeUser {
            likeUser(liker_uuid: "${liker_uuid}", liked_uuid: "${liked_uuid}") {
              liker_uuid,
              liked_uuid,
              liked_at
            }
          }
        `
      }
    })
    .then(result => {
      if (!result.data.errors) {
        console.log('liked')
        dispatch(userLiked(liked_uuid, feed));
      } else {
        console.log(result.data.errors);
      }
    })
  }
}

export function userUnliked(liked_uuid, feed) {
  const index = _.findIndex(feed.profiles, item => {
    return item.uuid === liked_uuid;
  })
  feed.profiles[index].is_liked = 0;
  return {
    feed: feed,
    type: types.UNLIKED_USER
  }
}

export function unLikeUser(liked_uuid) {
  return (dispatch, getState) => {
    const liker_uuid = getState().app.user.uuid;
    const feed = getState().app.feed;
    axios({
      url: 'http://localhost:3000/graphql/',
      method: 'post',
      headers: {
        'Protected': false,
        // 'Authorization': 'Bearer '+ localStorage.getItem('token')
      },
      data: {
        query:
        `
          mutation unlikeUser {
            unlikeUser(liker_uuid: "${liker_uuid}", liked_uuid: "${liked_uuid}") {
              liker_uuid,
              liked_uuid,
              liked_at
            }
          }
        `
      }
    })
    .then(result => {
      if (!result.data.errors) {
        dispatch(userUnliked(liked_uuid, feed));
        console.log('unliked')
      } else {
        console.log(result.data.errors);
      }
    })
  }
}

export function updateDropdown(value) {
  var text = value;
  value = value === 'hashtags' ? 'count_hashtags' : value;
  return {
    sortBy: {
      text: text,
      value: value
    },
    type: types.UPDATE_DROPDOWN
  }
}

export function switchView(appBox) {
  return {
    appBox: appBox,
    type: types.SWITCH_VIEW
  }
}

export function updateSearch(field, value) {
  if (field === 'age') {
    value.min = Math.max(18, value.min);
    value.max = Math.min(99, value.max);
  }
  if (field === 'popularity') {
    value.min = Math.max(25, value.min);
    value.max = Math.min(100, value.max);
  }
  if (field === 'distance') {
    value = Math.min(500, value)
  }
  return {
    field: field,
    value: value,
    type: types.UPDATE_SEARCH
  }
}

export function fetchNotifs(uuid) {
  return dispatch => {
    axios({
      url: 'http://localhost:3000/graphql/',
      method: 'post',
      headers: {
        'Protected': false,
        // 'Authorization': 'Bearer '+ localStorage.getItem('token')
      },
      data: {
        query:
        `
          query getNotifs {
            getNotifs(uuid: "${uuid}") {
              id,
              receiver_uuid,
              sender_uuid,
              type,
              received_at,
              sender_profile {
                uuid,
                id,
                distance,
                first_name,
                last_name,
                gender,
                age,
                address,
                description,
                popularity,
                is_liked,
                count_hashtags,
                likesyou,
                hashtags {
                  content
                },
                pictures {
                  id,
                  path
                }
              }
            }
          }
        `
      }
    })
    .then(result => {
      if (!result.data.errors) {
        dispatch(fetchNotifsSuccess(result.data.data.getNotifs));
      } else {
        console.log(result.data.errors);
      }
    })
  }
}

export function fetchNotifsSuccess(notifs) {
  return {
    notifs: notifs,
    type: types.FETCH_NOTIFS,
  }
}

export function newNotif(notif, type) {
  if (type !== 'message') {
    const id = Math.random() * 1000;
    return {
      notif: {new: true, type: type, id: id, sender_profile: {...notif}, /*received_at: timestamp*/},
      type: types.NEW_NOTIF
    }
  } else {
    return {
      notif: {new: true, type: type, id: notif.id, sender_profile: {...notif.author}},
      type: types.NEW_NOTIF
    }
  }
}

export function getMatches(uuid) {
  return dispatch => {
    axios({
      url: 'http://localhost:3000/graphql/',
      method: 'post',
      headers: {
        'Protected': false,
        // 'Authorization': 'Bearer '+ localStorage.getItem('token')
      },
      data: {
        query:
        `
          query getMatches {
            getMatches(uuid: "${uuid}") {
              id,
              uuid,
              first_name,
              last_name,
              pictures {
                id,
                path
              }
            }
          }
        `
      }
    })
    .then(result => {
      if (!result.data.errors) {
        dispatch(fetchMatches(result.data.data.getMatches));
      } else {
        console.log(result.data.errors);
      }
    })
  }
}

export function fetchMatches(matches) {
  return {
    matches: matches,
    type: types.FETCH_MATCHES
  }
}

export function setChatUuid(uuid) {
  return {
    chatUuid: uuid,
    type: types.SET_CHAT_UUID,
  }
}

export function switchChat(uuid) {
  return dispatch => {
    dispatch(setChatUuid(uuid));
  }
}

export function writeMessage(content) {
  return {
    content: content,
    type: types.WRITE_MESSAGE,
  }
}

export function addMessage(message) {
  return {
    message: message,
    type: types.ADD_MESSAGE
  }
}

export function postMessage(author_uuid, content, receiver_uuid) {
  content = content.replace(/\n$/, '');
  content = content.replace(/"/g, '\\"');
  content = content.replace("'", "''");
  return dispatch => {
    axios({
      url: 'http://localhost:3000/graphql/',
      method: 'post',
      headers: {
        'Protected': false,
        // 'Authorization': 'Bearer '+ localStorage.getItem('token')
      },
      data: {
        query:
        `
          mutation postMessage {
            postMessage(author_uuid: "${author_uuid}", receiver_uuid: "${receiver_uuid}", content: "${content}") {
              id,
              author_uuid,
              receiver_uuid,
              content,
            }
          }
        `
      }
    })
    .then(result => {
      if (!result.data.errors) {
        dispatch(addMessage(result.data.data.postMessage));
      } else {
        console.log(result.data.errors);
      }
    })
  }
}

export function fetchMessages(messages) {
  return {
    messages: messages,
    type: types.FETCH_MESSAGES
  }
}

export function getMessages(uuid) {
  return dispatch => {
    axios({
      url: 'http://localhost:3000/graphql/',
      method: 'post',
      headers: {
        'Protected': false,
        // 'Authorization': 'Bearer '+ localStorage.getItem('token')
      },
      data: {
        query:
        `
          query getMessages {
            getMessages(uuid: "${uuid}") {
              id,
              author_uuid,
              receiver_uuid,
              content,
              sent_at
            }
          }
        `
      }
    })
    .then(result => {
      if (!result.data.errors) {
        dispatch(fetchMessages(result.data.data.getMessages));
      } else {
        console.log(result.data.errors);
      }
    })
  }
}

export function messageReceived(message) {
  return {
    message: {content: message.content, id: message.id, sent_at: message.sent_at, receiver_uuid: message.receiver_uuid, author_uuid: message.author_uuid},
    type: types.MESSAGE_RECEIVED
  }
}

export function isCompleted(user) {
  return {
    completed: user.completed,
    type: types.CHECK_COMPLETED
  }
}

export function checkCompleted(uuid) {
  return dispatch => {
    axios({
      url: 'http://localhost:3000/graphql/',
      method: 'post',
      headers: {
        'Protected': false,
        // 'Authorization': 'Bearer '+ localStorage.getItem('token')
      },
      data: {
        query:
        `
          query user {
            user(uuid: "${uuid}") {
              completed
            }
          }
        `
      }
    })
    .then(result => {
      if (!result.data.errors) {
        dispatch(isCompleted(result.data.data.user));
      } else {
        console.log(result.data.errors);
      }
    })
  }
}
