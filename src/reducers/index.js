import { combineReducers } from 'redux';
import auth from './auth';
import signinuser from './signin';
import signup from './signup';
import { articleComments, newComment } from './comments';

const rootReducer = combineReducers({
  auth,
  signinuser,
  signup,
  articleComments,
  newComment
});

export default rootReducer;
