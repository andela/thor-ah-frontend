import initialState from '../store/initialState';
import * as types from '../actionTypes/userProfile';

const userProfileReducer = (state = initialState.userProfile, action) => {
  switch (action.type) {
    case types.FETCH_USER_PROFILE_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case types.FETCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload,
      }
    default:
      return state;
  }
};

export default userProfileReducer;
