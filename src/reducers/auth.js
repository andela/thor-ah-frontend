import isEmpty from 'lodash/isEmpty';

// types
import { SIGN_IN_SUCCESS, SET_CURRENT_USER, LOG_OUT_USER } from "../actions/action.types";

// initial state
import  initialState from '../store/initialState';

// reducers
import signinReducer from './signin';

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
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true
      };
    default:
      return {
        ...state,
        signin: signinReducer(state.signin, action)
      }
  }
};

export default auth;
