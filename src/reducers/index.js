import { combineReducers } from 'redux';

// initial dummy state setup
const app = (state = {intro: 'welcome to ah'}) => state

const rootReducer = combineReducers({
  app,
});

export default rootReducer;