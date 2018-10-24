import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import community from '../../actions/community';
import * as types from '../../actionTypes/community';

const { fetchFollowers, fetchFollowing } = community;

const API = process.env.REACT_APP_API;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const moxios = new MockAdapter(axios);

describe('community actions', () => {
  afterEach(() => {
    moxios.reset();
  });

  describe('fetchFollowers', () => {
    it('dispatches FETCH_FOLLOWERS_SUCCESS after fetching comments', () => {
      moxios.onGet(`${API}/api/users/follow/followers`)
        .reply(200, {
          followers: [
            {id: 1, body: 'The body'}
          ]
        });

      const expectedActions = [
        {
          type: types.FETCH_FOLLOWERS_LOADING,
          payload: true
        },
        {
          type: types.FETCH_FOLLOWERS_LOADING,
          payload: false
        },
        {
          type: types.FETCH_FOLLOWERS_SUCCESS,
          payload: [
            {id: 1, body: 'The body'}
          ]
        }
      ]

      const store = mockStore({comments: {}});
      return store.dispatch(fetchFollowers())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('dispatches FETCH_FOLLOWERS_FAILURE after fetching comments', () => {
      moxios.onGet(`${API}/api/users/follow/followers`)
        .networkError('Error loading followers');

      const expectedActions = [
        {
          type: types.FETCH_FOLLOWERS_LOADING,
          payload: true
        },
        {
          type: types.FETCH_FOLLOWERS_LOADING,
          payload: false
        },
        {
          type: types.FETCH_FOLLOWERS_FAILURE,
          payload: 'Error loading followers'
        }
      ]

      const store = mockStore({comments: {}});
      return store.dispatch(fetchFollowers())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('fetchFollowing', () => {
    it('dispatches FETCH_FOLLOWING_SUCCESS after fetching comments', () => {
      moxios.onGet(`${API}/api/users/follow/followings`)
        .reply(200, {
          following: [
            {id: 1, body: 'The body'}
          ]
        });

      const expectedActions = [
        {
          type: types.FETCH_FOLLOWING_LOADING,
          payload: true
        },
        {
          type: types.FETCH_FOLLOWING_LOADING,
          payload: false
        },
        {
          type: types.FETCH_FOLLOWING_SUCCESS,
          payload: [
            {id: 1, body: 'The body'}
          ]
        }
      ]

      const store = mockStore({comments: {}});
      return store.dispatch(fetchFollowing())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('dispatches FETCH_FOLLOWING_FAILURE after fetching comments', () => {
      moxios.onGet(`${API}/api/users/follow/followings`)
        .networkError('Error loading following');

      const expectedActions = [
        {
          type: types.FETCH_FOLLOWING_LOADING,
          payload: true
        },
        {
          type: types.FETCH_FOLLOWING_LOADING,
          payload: false
        },
        {
          type: types.FETCH_FOLLOWING_FAILURE,
          payload: 'Error loading following'
        }
      ]

      const store = mockStore({comments: {}});
      return store.dispatch(fetchFollowing())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});
