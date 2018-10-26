import userProfile from '../../reducers/userProfile';
import * as types from '../../actionTypes/userProfile';

describe('userProfile reducer', () => {
  it('should return initial state', () => {
    expect(userProfile(undefined, {})).toEqual({
      user: {},
      loading: false,
      isFollowing: false,
    });
  });

  it('should handle FETCH_USER_PROFILE_SUCCESS', () => {
    const action = {
      type: types.FETCH_USER_PROFILE_SUCCESS,
      payload: {id: 1, name: 'Jon'}
    };
    expect(userProfile({}, action)).toEqual({
      user: action.payload,
    });
  });

  it('should handle FETCH_USER_PROFILE_LOADING', () => {
    const action = {
      type: types.FETCH_USER_PROFILE_LOADING,
      payload: true
    };
    expect(userProfile({}, action)).toEqual({
      loading: action.payload,
    });
  });

  it('should handle SET_IS_FOLLOWING', () => {
    const action = {
      type: types.SET_IS_FOLLOWING,
      payload: false
    };
    expect(userProfile({}, action)).toEqual({
      isFollowing: action.payload,
    });
  });

  it('should handle FOLLOW_USER_SUCCESS', () => {
    const action = {
      type: types.FOLLOW_USER_SUCCESS,
    };
    expect(userProfile({}, action)).toEqual({
      isFollowing: true,
    });
  });

  it('should handle UNFOLLOW_USER_SUCCESS', () => {
    const action = {
      type: types.UNFOLLOW_USER_SUCCESS,
    };
    expect(userProfile({}, action)).toEqual({
      isFollowing: false,
    });
  });
});
