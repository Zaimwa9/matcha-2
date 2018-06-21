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
  UPLOAD_PICTURE_REQUEST,
  UPLOAD_PICTURE_FAILURE,
  MANAGE_PICTURE_MODE,
  DELETE_PICTURE_FAILURE,
  DELETE_PICTURE_SUCCESS,
  SET_EDITING_MODE,
  UPDATE_DESCRIPTION_FAILURE,
  UPDATE_DESCRIPTION_SUCCESS
} from '../actions/appActionTypes';

const initialState = {
  user: {
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    age: '',
    description: 'youpi',
    hashtags: [],
    pictures: [],
    addinghash: '',
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
    manageMode: true,
  },
  descBlock: {
    editMode: true,
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

    case UPLOAD_PICTURE_SUCCESS:
      newState = {...state, user: {...state.user, pictures: [...state.user.pictures, {...action.picture}]}}
      console.log(newState.user)
      return newState;
    case ADD_HASHTAG:
      newState = {...state, user: {...state.user, addinghash: '', hashtags: [...state.user.hashtags, {...action.data}]}}
      return newState
    case ADD_HASHTAG_FAILURE:
      newState = {...state, error: true, error_message: action.error_message};
      return newState
    case FETCH_HASHTAGS_SUCCESS:
      newState = {...state, user: {...state.user, pictures: [...action.pictures], hashtags: [...action.hashtags]}, witness: {...state.witness, hashtags: [...action.hashtags]}}
      return newState;
    case FETCH_HASHTAGS_FAILURE:
      console.log('ERROR');
      // newState = {...state, user: {...state.user, ...action.data}}
      return action;

    case DELETE_PICTURE_SUCCESS:
      console.log(action.pictures);
      newState = {...state, user: {...state.user, pictures: [...action.pictures]}};
      return newState;
    case DELETE_HASHTAG_FAILURE:
      newState = {...state, error: true, error_message: action.error_message};
      return newState;
    case DELETE_HASHTAG_SUCCESS:
      newState = {...state, user: {...state.user, hashtags: [...action.hashtags]}};
      return newState;
    case DELETE_HASHTAG_FAILURE:
      newState = {...state, error: true, error_message: action.error_message};
      return newState

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
      console.log(action)
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

    case LOGOUT:
      newState = initialState;
      localStorage.removeItem('token');
      newState.user.isAuth = false;
      return newState;
    default:
      return state;
  }
}
