import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import userProfile from '../../actions/userProfile';
import * as types from '../../actionTypes/userProfile';

const { fetchUserProfile } = userProfile;

const API = process.env.REACT_APP_API;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const moxios = new MockAdapter(axios);

describe('userProfile actions', () => {
  afterEach(() => {
    moxios.reset();
  });

  describe('fetchUserProfile', () => {
    it('dispatches FETCH_USER_PROFILE_SUCCESS after fetching', () => {
      moxios.onGet(`${API}/api/users/cyk`)
        .reply(200, {
          profile: {
            id: 1,
            body: 'The body'
          }
        });

      const expectedActions = [
        {
          type: types.FETCH_USER_PROFILE_LOADING,
          payload: true
        },
        {
          type: types.FETCH_USER_PROFILE_LOADING,
          payload: false
        },
        {
          type: types.FETCH_USER_PROFILE_SUCCESS,
          payload: {id: 1, body: 'The body'}
        }
      ]

      const store = mockStore({});
      return store.dispatch(fetchUserProfile('cyk'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('dispatches FETCH_USER_PROFILE_FAILURE if any error occurs', () => {
      moxios.onGet(`${API}/api/users/cyk`)
        .networkError();

      const expectedActions = [
        {
          type: types.FETCH_USER_PROFILE_LOADING,
          payload: true
        },
        {
          type: types.FETCH_USER_PROFILE_LOADING,
          payload: false
        },
        {
          type: types.FETCH_USER_PROFILE_FAILURE,
          payload: 'Network Error'
        }
      ]

      const store = mockStore({});
      return store.dispatch(fetchUserProfile('cyk'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});
