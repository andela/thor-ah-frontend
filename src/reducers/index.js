import { combineReducers } from 'redux';
import auth from './auth';
import signinuser from './signin';
import signup from './signup';
import comments from './comments';
import articleCategoryReducer from './categories';
import createArticle from './createArticle';
import article from "./article";
import favorite from './favorite'

const rootReducer = combineReducers({
  auth,
  article,
  signinuser,
  signup,
  comments,
  category: articleCategoryReducer,
  createArticle,
  favorite
});

export default rootReducer;
