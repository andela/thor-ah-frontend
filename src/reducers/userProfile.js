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
    case types.SET_IS_FOLLOWING:
      return {
        ...state,
        isFollowing: action.payload,
      }
    case types.FOLLOW_USER_SUCCESS:
      return {
        ...state,
        isFollowing: true,
      }
    case types.UNFOLLOW_USER_SUCCESS:
      return {
        ...state,
        isFollowing: false,
      }
    default:
      return state;
  }
};

export default userProfileReducer;
