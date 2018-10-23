import isEmpty from 'lodash/isEmpty';

// types
import { SET_CURRENT_USER, LOG_OUT_USER } from '../actionTypes/auth';
import { SIGNUP_SUCCESS } from '../actionTypes/signup'
import { SIGN_IN_SUCCESS } from '../actionTypes/signin';
import { UPDATE_USER_INFO_SUCCESS } from '../actionTypes/updateUser';

// initial state
import initialState from '../store/initialState';

// reducers
import signinReducer from './signin';
import signupReducer from './signup';

const auth = (state = initialState.auth, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case LOG_OUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: {}
      };
    case UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        isAuthenticated: true, 
        user: { ...state.user, ...action.payload }
      }
    case SIGN_IN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true
      };
    default:
      return {
        ...state,
        signin: signinReducer(state.signin, action),
        signup: signupReducer(state.signup, action)
      }
  }
};

export default auth;
