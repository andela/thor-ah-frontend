import {
  SIGN_IN_FAILURE,
  CLEAR_ERROR,
  SIGN_IN_LOADING
} from '../actions/action.types';
import initialState from '../store/initialState';

export default function reducer(state = initialState.auth.signin, action) {
  switch (action.type) {
    case SIGN_IN_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
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
