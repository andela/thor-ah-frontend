import community, { followers, following } from '../../reducers/community';
import * as types from '../../actionTypes/community';

describe('community reducer', () => {
  it('should return initial state', () => {
    expect(community(undefined, {})).toEqual({
     followers: {
       data: [],
       error: '',
       loading: false,
     },
     following: {
       data: [],
         error: '',
         loading: false,
     },
    });
  });

  it('should handle REMOVE_USER_FROM_LIST', () => {
    const action = {
      type: types.REMOVE_USER_FROM_LIST,
      payload: '1',
    }
    const state = {
      following: {
        data: [
          {
            id: 234,
            name: 'user'
          },
          {
            id: 239,
            name: 'another user'
          },
        ]
      }
    }
    expect(community(state, action)).toEqual({
    followers: {
       data: [],
       error: '',
       loading: false,
     },
     following: {
       data: [
         {
           id: 234,
           name: 'user'
         }
       ],
     },
    });
  });

  describe('followers reducer', () => {
    it('should handle FETCH_FOLLOWERS_LOADING', () => {
      const action = {
        type: types.FETCH_FOLLOWERS_LOADING,
        payload: true
      };
      expect(followers({}, action)).toEqual({
        loading: action.payload,
      });
    });

    it('should handle FETCH_FOLLOWERS_SUCCESS', () => {
      const action = {
        type: types.FETCH_FOLLOWERS_SUCCESS,
        payload: [{id: 1}]
      };
      expect(followers({}, action)).toEqual({
        data: action.payload,
      });
    });

    it('should handle FETCH_FOLLOWERS_FAILURE', () => {
      const action = {
        type: types.FETCH_FOLLOWERS_FAILURE,
        payload: {message: 'some error'}
      };
      expect(followers({}, action)).toEqual({
        error: action.payload,
      });
    });
  });

  describe('following reducer', () => {
    it('should handle FETCH_FOLLOWING_LOADING', () => {
      const action = {
        type: types.FETCH_FOLLOWING_LOADING,
        payload: true
      };
      expect(following({}, action)).toEqual({
        loading: action.payload,
      });
    });

    it('should handle FETCH_FOLLOWING_SUCCESS', () => {
      const action = {
        type: types.FETCH_FOLLOWING_SUCCESS,
        payload: [{id: 1}]
      };
      expect(following({}, action)).toEqual({
        data: action.payload,
      });
    });

    it('should handle FETCH_FOLLOWING_FAILURE', () => {
      const action = {
        type: types.FETCH_FOLLOWING_FAILURE,
        payload: {message: 'some error'}
      };
      expect(following({}, action)).toEqual({
        error: action.payload,
      });
    });
  });

  /*
  TODO: test the following actions handlers
   FOLLOW_USER_LOADING
   FOLLOW_USER_SUCCESS
   FOLLOW_USER_FAILED
   UNFOLLOW_USER_LOADING
   UNFOLLOW_USER_SUCCESS
   UNFOLLOW_USER_FAILED
  */

});
