import { combineReducers } from 'redux';
import auth from './auth.reducer';
import articleReducer from './arrticle';

// initial dummy state setup
const app = (state = {intro: 'welcome to ah'}) => state

const rootReducer = combineReducers({
  app,
  auth,
  article: articleReducer
});

export default rootReducer;
