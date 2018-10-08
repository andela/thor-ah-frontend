import isEmpty from 'lodash/isEmpty';
import { SET_CURRENT_USER, LOG_OUT_USER } from "../actions/action.types";

const initialState = {
  isAuthenticated: true,
  user: {},
};

const auth = (state = initialState, action) => {
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
    default:
      return state;
  }
};

export default auth;
