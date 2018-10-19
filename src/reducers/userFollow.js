import {
  FETCH_USER_FOLLOW_SUCCESS,
  FETCH_USER_FOLLOW_REQUEST,
  FETCH_USER_FOLLOW_FAILED,
} from '../actionTypes/userFollow';
import initialState from '../store/initialState';

const fetchUserFollow = (state=initialState.userFollow, action) => {
  const { type } = action;
  switch(type) {
    case FETCH_USER_FOLLOW_FAILED:
      return {
        ...state,
        error: action.payload
      }
    case FETCH_USER_FOLLOW_SUCCESS:
      return {
        ...state,
        follows: { ...action.payload }
      }
    case FETCH_USER_FOLLOW_REQUEST:
      return {
        ...state,
        loading: action.payload,
      }
    default:
      return state;
  }
}

export default fetchUserFollow;
