import { combineReducers } from 'redux';
import auth from './auth';
import signinuser from './signin';
import signup from './signup';

const rootReducer = combineReducers({
  auth,
  signinuser,
  signup,
});

export default rootReducer;
