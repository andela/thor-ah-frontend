import { combineReducers } from 'redux';
<<<<<<< HEAD
import auth from './auth.reducer';

=======
import signInUser from './SignIn';
>>>>>>> feat: add user login feature
// initial dummy state setup
const app = (state = {intro: 'welcome to ah'}) => state

const rootReducer = combineReducers({
  app,
<<<<<<< HEAD
  auth,
=======
  signInUser,
>>>>>>> feat: add user login feature
});

export default rootReducer;
