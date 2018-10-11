import { combineReducers } from 'redux';
import auth from './auth';
import signinuser from './signin';
import signup from './signup';
import comments from './comments';
import articleCategoryReducer from './categories';
import article from './article';

const rootReducer = combineReducers({
  auth,
  article,
  signinuser,
  signup,
  comments,
  category: articleCategoryReducer
});

export default rootReducer;
