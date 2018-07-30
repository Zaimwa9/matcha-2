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
  DELETE_HASHTAG_SUCCESS,
  DELETE_HASHTAG_FAILURE,
  UPLOAD_PICTURE_SUCCESS,
//  UPLOAD_PICTURE_REQUEST,
//  UPLOAD_PICTURE_FAILURE,
  MANAGE_PICTURE_MODE,
//  DELETE_PICTURE_FAILURE,
  DELETE_PICTURE_SUCCESS,
  SET_EDITING_MODE,
//  UPDATE_DESCRIPTION_FAILURE,
  UPDATE_DESCRIPTION_SUCCESS,
  UPDATE_PWD,
  SUBMIT_PWD_FAILURE,
  SUBMIT_PWD_SUCCESS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_REQUEST,
  FETCH_USERS_FAILURE,
//  NEW_VISIT,
//  REPORT_USER,
  BLOCKED_USER,
  LIKED_USER,
  UNLIKED_USER,
  UPDATE_DROPDOWN,
  SWITCH_VIEW,
  UPDATE_SEARCH,
  FETCH_NOTIFS,
  NEW_NOTIF,
  FETCH_MATCHES,
  WRITE_MESSAGE,
  SET_CHAT_UUID,
  FETCH_MESSAGES,
  ADD_MESSAGE,
  MESSAGE_RECEIVED,
  CHECK_COMPLETED
} from '../actions/appActionTypes';

const initialState = {
  user: {
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    age: '',
    completed: 0,
    description: 'youpi',
    hashtags: [],
    pictures: [],
    addinghash: '',
    address: 'greneta',
    orientation: 'bi',
    lat: '',
    lng: '',
    isAuth: true,
    isFilled: false,
  },
  menu: {
    activeItem: '',
  },
  infoBlock: {
    updateMode: false,
  },
  pictureBlock: {
    manageMode: false,
  },
  descBlock: {
    editMode: false,
  },
  requesting: false,
  error: false,
  error_message: '',
  updatePwd: {
    oldPwd: '',
    newPwd: '',
  },
  complete: false,
  feed: {
    loading: false,
    fetched: false,
    profiles: []
  },
  sortBy:
  {
    text: 'popularity',
    value: 'popularity'
  },
  appBox: '',
  search: {
    age: {
      min: 18,
      max: 99
    },
    popularity: {
      min: 25,
      max: 100
    },
    distance: 500,
    hashtags: ''
  },
  notifs: [],
  matches: [],
  chatBox: {
    match_uuid: '',
    messages: [],
    content: ''
  }
}

export default function appRed(state = initialState, action) {
  let newState;

  switch (action.type) {
    case RESET_UPDATE:
      newState = {...state, user: {...state.witness, address: state.user.address, description: state.user.description, pictures: [...state.user.pictures]}, appBox: ''};
      return newState;

    case SWITCH_VIEW:
      newState = {...state, appBox: action.appBox, feed: {...state.feed, profiles: [], fetched: false}}
      return newState;
    case UPDATE_SEARCH:
      newState = {...state, search: {...state.search, [action.field]: action.value}}
      return newState;

    case CHECK_COMPLETED:
      newState = {...state, user: {...state.user, completed: action.completed}};
      return newState;

    case FETCH_NOTIFS:
      newState = {...state, notifs: [...action.notifs]}
      return newState;
    case FETCH_MATCHES:
      newState = {...state, matches: action.matches}
      return newState;

    case ADD_MESSAGE:
      newState = {...state, chatBox: {...state.chatBox, messages: [...state.chatBox.messages, {...action.message}]}}
      return newState;
    case MESSAGE_RECEIVED:
      newState = {...state, chatBox: {...state.chatBox, messages: [...state.chatBox.messages, {...action.message}]}}
      return newState;

    case WRITE_MESSAGE:
      newState = {...state, chatBox: {...state.chatBox, content: action.content}}
      return newState;
    case SET_CHAT_UUID:
      newState = {...state, chatBox: {match_uuid: action.chatUuid, messages: [], content: ''}}
      return newState;

    case FETCH_MESSAGES:
      newState = {...state, chatBox: {...state.chatBox, messages: action.messages}};
      return newState;

    case NEW_NOTIF:
      newState = {...state, notifs: [{...action.notif}, ...state.notifs]}
      return newState;

    case LIKED_USER:
      newState = {...state, feed: {...action.feed}};
      return newState;
    case UNLIKED_USER:
      newState = {...state, feed: {...action.feed}};
      return newState;
    case BLOCKED_USER:
      newState = {...state, feed: {...action.feed}};
      return newState;
    case UPDATE_DROPDOWN:
      newState = {...state, sortBy: {...action.sortBy}}
      return newState;

    case FETCH_USERS_REQUEST:
      newState = {...state, feed: {...state.feed, loading: true }}
      return newState;
    case FETCH_USERS_SUCCESS:
      newState = {...state, feed: {profiles: action.profiles, fetched: true, loading: false}}
      return newState;
    case FETCH_USERS_FAILURE:
      newState = {...state, error: true, error_message: action.error_message};
      return newState;
    case SUBMIT_PWD_FAILURE:
      newState = {...state, error: true, error_message: action.error_message};
      return newState;
    case SUBMIT_PWD_SUCCESS:
      newState = {...state};
      return newState;

    case UPLOAD_PICTURE_SUCCESS:
      newState = {...state, user: {...state.user, pictures: [...state.user.pictures, {...action.picture}]}}
      return newState;
    case ADD_HASHTAG:
      newState = {...state, user: {...state.user, addinghash: '', hashtags: [...state.user.hashtags, {...action.data}]}}
      return newState
    case ADD_HASHTAG_FAILURE:
      newState = {...state, error: true, error_message: action.error_message};
      return newState
    case FETCH_HASHTAGS_SUCCESS:
      newState = {...state, complete: true, user: {...state.user, popularity: action.popularity, gender: action.gender, age: action.age, lat: action.lat, lng: action.lng, address: action.address, orientation: action.orientation, description: action.description, pictures: [...action.pictures], hashtags: [...action.hashtags]}, witness: {...state.witness, hashtags: [...action.hashtags]}}
      return newState;
    case FETCH_HASHTAGS_FAILURE:
      // console.log('ERROR');
      // newState = {...state, user: {...state.user, ...action.data}}
      return action;

    case DELETE_PICTURE_SUCCESS:
      // console.log(action.pictures);
      newState = {...state, user: {...state.user, pictures: [...action.pictures]}};
      return newState;
    case DELETE_HASHTAG_FAILURE:
      newState = {...state, error: true, error_message: action.error_message};
      return newState;
    case DELETE_HASHTAG_SUCCESS:
      newState = {...state, user: {...state.user, hashtags: [...action.hashtags]}};
      return newState;

    case USER_UPDATE_REQUEST:
      newState = {...state, requesting: true, error: false, error_message: ''};
      return newState;
    case USER_UPDATE_SUCCESS:
      newState = {...state, requesting: false, user: {...state.user, ...action.user}, witness: {...state.witness, ...action.user}};
      return newState;
    case USER_UPDATE_FAILURE:
      newState = {...state, requesting: false, error: true, error_message: action.error.message};
      return newState;

    case UPDATE_DESCRIPTION_SUCCESS:
      newState = {...state, user: {...state.user, description: action.description }, descBlock: { editMode: false }}
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
    case MANAGE_PICTURE_MODE:
      newState = {...state, pictureBlock: {...action.pictureBlock}};
      return newState;
    case SET_EDITING_MODE:
      newState = {...state, descBlock: {...action.descBlock}}
      return newState;
    case UPDATE_PWD:
      newState = {...state, updatePwd: {...state.updatePwd, ...action.updatePwd}};
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
