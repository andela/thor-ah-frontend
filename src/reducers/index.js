import { combineReducers } from 'redux';
import auth from './auth';
import signinuser from './signin';
import signup from './signup';
import comments from './comments';
import articleCategoryReducer from './categories';
import createArticle from './createArticle';
import favorite from './favorite'
import { oneArticleReducer, allArticleReducer } from './article';

const rootReducer = combineReducers({
  auth,
  oneArticleReducer,
  allArticleReducer,
  signinuser,
  signup,
  comments,
  category: articleCategoryReducer,
  createArticle,
  favorite
});

export default rootReducer;
