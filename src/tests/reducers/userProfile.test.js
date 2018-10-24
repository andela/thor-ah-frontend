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
});
