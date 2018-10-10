import isEmpty from 'lodash/isEmpty';

// types
import { SET_CURRENT_USER, LOG_OUT_USER } from "../actions/types/auth";
import { SIGNUP_SUCCESS } from "../actions/types/signup"

// initial state
import initialState from '../store/initialState';

// reducers
import signupReducer from './signup';

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
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true
      };
    default:
      return {
        ...state,
        signup: signupReducer(state.signup, action)
      }
  }
};

export default auth;
