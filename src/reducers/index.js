import { combineReducers } from 'redux';
import auth from './auth';
import signinuser from './signin';

const rootReducer = combineReducers({
  auth,
  signinuser,
});

export default rootReducer;
