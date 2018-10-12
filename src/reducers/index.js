import { combineReducers } from 'redux';
import auth from './auth';
import signinuser from './signin';
import signup from './signup';
import comments from './comments';
import articleCategoryReducer from './categories';

const rootReducer = combineReducers({
  auth,
  signinuser,
  signup,
  comments,
  category: articleCategoryReducer
});

export default rootReducer;
