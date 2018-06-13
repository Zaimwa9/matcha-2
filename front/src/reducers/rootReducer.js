import {combineReducers} from 'redux';
import logSign from './logSignReducer';
import app from './appReducer';

const rootReducer = combineReducers({
  logSign,
  app
});

export default rootReducer;