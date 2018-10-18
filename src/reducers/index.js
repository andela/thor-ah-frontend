import { combineReducers } from 'redux';
import auth from './auth';
import signinuser from './signin';
import signup from './signup';
import comments from './comments';
import category from './categories';
import createArticle from './createArticle';
import favorite from './favorite'
import { oneArticleReducer, allArticleReducer } from './article';
import relatedArticle from "./relatedArticle";
import drafts from './drafts';
import articleUpdate from './updateArticle';

const rootReducer = combineReducers({
  auth,
  oneArticleReducer,
  allArticleReducer,
  signinuser,
  signup,
  comments,
  category,
  createArticle,
  favorite,
  relatedArticle,
  drafts,
  articleUpdate
});

export default rootReducer;
