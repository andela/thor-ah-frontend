import { combineReducers } from 'redux';
import auth from './auth.reducer';

// initial dummy state setup
const app = (state = {intro: 'welcome to ah'}) => state

const rootReducer = combineReducers({
  app,
  auth,
});

export default rootReducer;
