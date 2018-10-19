import {
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_FAILED,
} from '../actionTypes/updateUser';
import initialState from '../store/initialState';

const updateUser = (state = initialState.updateUser, action) => {
  switch (action.type) {
    case UPDATE_USER_INFO_REQUEST:
      return {
        ...state,
        loading: action.payload,
      }
    case UPDATE_USER_INFO_FAILED:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state;
  }
}

export default updateUser;
