import { combineReducers } from 'redux';
<<<<<<< HEAD
import auth from './auth.reducer';
import users from './user.signup';
import auth from './auth';
import signinuser from './signin';
=======
import auth from './auth';
import signup from './signup';

const app = (state = { intro: 'welcome to ah' }) => state
>>>>>>> t nitPicks: fix ft-user-signup-159987624

const rootReducer = combineReducers({
  auth,
<<<<<<< HEAD
  signinuser,
  users,
=======
  signup,
>>>>>>> t nitPicks: fix ft-user-signup-159987624
});

export default rootReducer;
