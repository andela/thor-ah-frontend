import { combineReducers } from "redux";
import auth from "./auth";
import signinuser from "./signin";
import signup from "./signup";
import comments from "./comments";
import category from "./categories";
import createArticle from "./createArticle";
import favorite from "./favorite";
import {
  oneArticleReducer,
  allArticleReducer,
  featuredReducer,
  recommendedReducer
} from "./article";
import relatedArticle from "./relatedArticle";
import drafts from './drafts';
import articleUpdate from './updateArticle';
import readingStats from './readingStats';
import favouriteArticles from './favouriteArticles';
import publishedArticles from './publishedArticles';
import articleSearch from './articleSearch';
import updateUser from './updateUser';
import userFollow from './userFollow';
import uploadPhoto from './uploadPhoto';
import notification from './notification';
import settings from "./settings";
import community from './community';
import userProfile from './userProfile';
import reportArticle from './reportArticle';

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
  favorite,
  relatedArticle,
  drafts,
  articleUpdate,
  readingStats,
  favouriteArticles,
  publishedArticles,
  articleSearch,
  createArticle,
  userStore: updateUser,
  userFollow,
  uploadPhoto,
  notification,
  settings,
  community,
  userProfile,
  reportArticle
});

export default rootReducer;
