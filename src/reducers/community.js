import initialState from '../store/initialState';
import * as types from '../actionTypes/community';

const { community } = initialState;

export const followers = (state = community.followers, action) => {
  switch (action.type) {
    case types.FETCH_FOLLOWERS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case types.FETCH_FOLLOWERS_SUCCESS:
      return {
        ...state,
        data: action.payload,
      }
    case types.FETCH_FOLLOWERS_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state;
  }
};

export const following = (state = community.following, action) => {
  switch (action.type) {
    case types.FETCH_FOLLOWING_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case types.FETCH_FOLLOWING_SUCCESS:
      return {
        ...state,
        data: action.payload,
      }
    case types.FETCH_FOLLOWING_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state;
  }
};

const communityReducer = (state = community, action) => {
  switch (action.type) {
    default:
      return {
        ...state,
        followers: followers(state.followers, action),
        following: following(state.following, action),
      };
  }
};

export default communityReducer;
