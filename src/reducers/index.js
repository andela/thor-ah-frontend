import { combineReducers } from 'redux';
import auth from './auth.reducer';
import users from './user.signup';

const app = (state = { intro: 'welcome to ah' }) => state

const rootReducer = combineReducers({
  app,
  auth,
  users,
});

export default rootReducer;
