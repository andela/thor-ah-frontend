import isEmpty from 'lodash/isEmpty';

// types
<<<<<<< HEAD
import { SIGN_IN_SUCCESS, SET_CURRENT_USER, LOG_OUT_USER } from "../actions/action.types";

// initial state
import  initialState from '../store/initialState';

// reducers
import signinReducer from './signin';
=======
import { SET_CURRENT_USER, LOG_OUT_USER } from "../actions/types/auth";
import { SIGNUP_SUCCESS } from "../actions/types/signup"

// initial state
import initialState from '../store/initialState';

// reducers
import signupReducer from './signup';
>>>>>>> t nitPicks: fix ft-user-signup-159987624

const auth = (state = initialState.auth, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      }
    case LOG_OUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: {}
      }
<<<<<<< HEAD
    case SIGN_IN_SUCCESS:
=======
    case SIGNUP_SUCCESS:
>>>>>>> t nitPicks: fix ft-user-signup-159987624
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true
      };
    default:
      return {
        ...state,
<<<<<<< HEAD
        signin: signinReducer(state.signin, action)
=======
        signup: signupReducer(state.signup, action)
>>>>>>> t nitPicks: fix ft-user-signup-159987624
      }
  }
};

export default auth;
