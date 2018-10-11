import { combineReducers } from 'redux';
import auth from './auth';
import signinuser from './signin';
import signup from './signup';
import comments from './comments';

const rootReducer = combineReducers({
  auth,
  signinuser,
  signup,
  comments,
});

export default rootReducer;
