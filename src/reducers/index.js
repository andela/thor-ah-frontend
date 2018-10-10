import { combineReducers } from 'redux';
import auth from './auth.reducer';
import signInUser from './SignIn';

const rootReducer = combineReducers({
  auth,
  signInUser,
});

export default rootReducer;
