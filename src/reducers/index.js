import { combineReducers } from 'redux';
import auth from './auth';
import signinuser from './signin';
import signup from './signup';
import comments from './comments';
import category from './categories';
import createArticle from './createArticle';
import favorite from './favorite'
import { oneArticleReducer, allArticleReducer, featuredReducer, recommendedReducer } from './article';
import relatedArticle from "./relatedArticle";
import drafts from './drafts';
import articleUpdate from './updateArticle';
import readingStats from './readingStats';

const rootReducer = combineReducers({
  auth,
  oneArticleReducer,
  allArticleReducer,
  featuredReducer,
  recommendedReducer,
  signinuser,
  signup,
  comments,
  category,
  createArticle,
  favorite,
  relatedArticle,
  drafts,
  articleUpdate,
  readingStats,
});

export default rootReducer;
