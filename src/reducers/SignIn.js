import {
  USER_SIGN_IN_FULFILLED,
  USER_SIGN_IN_FAILED,
  CLEAR_ERROR,
  SIGNING_IN_REQUEST
} from '../actions/action.types';

const initialState = {
  token: '',
  user: {},
  signingIn: false,
  error: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SIGNING_IN_REQUEST:
      return {
        ...state,
        signingIn: true,
        error: '',
      };
    case USER_SIGN_IN_FULFILLED:
      return {
        ...state,
        signingIn: false,
        user: action.payload.user,
        token: action.payload.token,
        error: ''
      };
    case USER_SIGN_IN_FAILED:
      return {
        ...state,
        signingIn: false,
        error: action.payload.error.message,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: ''
      }
    default:
      return state;
  }
};
