import { combineReducers } from 'redux';
import auth from './auth.reducer';
import users from './user.signup';
import auth from './auth';
import signinuser from './signin';

const rootReducer = combineReducers({
  auth,
  signinuser,
  users,
});

export default rootReducer;
