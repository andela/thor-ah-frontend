import {
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_FAILED,
  UPDATE_USER_INFO_SUCCESS,
} from '../actionTypes/updateUser';
import initialState from '../store/initialState';

const updateUser = (state = initialState.updateUser, action) => {
  switch (action.type) {
    case UPDATE_USER_INFO_REQUEST:
      return {
        ...state,
        loading: action.payload,
      }
    case UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: '',
      }
    case UPDATE_USER_INFO_FAILED:
      return {
        ...state,
        error: action.payload,
        user: {},
      }
    default:
      return state;
  }
}

export default updateUser;
