import {
  SIGNING_USER_IN,
  USER_SIGN_IN_FULFILLED,
  USER_SIGN_IN_FAILED,
} from '../actions/action.types';

const initialState = {
  token: '',
  user: {},
  signingIn: false,
  error: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SIGNING_USER_IN:
      return {
        ...state,
        signingIn: true,
        message: action.payload.message,
        error: ''
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
    default:
      return state;
  }
};
