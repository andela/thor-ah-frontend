import { combineReducers } from 'redux';
import auth from './auth';
import signup from './signup';

const app = (state = { intro: 'welcome to ah' }) => state

const rootReducer = combineReducers({
  app,
  auth,
  signup,
});

export default rootReducer;
