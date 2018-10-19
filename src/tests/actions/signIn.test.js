import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import signIn, { handleSocialAuth } from '../../actions/signIn';
import * as types from '../../actionTypes/signin';

const API = process.env.REACT_APP_API;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const moxios = new MockAdapter(axios);

describe('sign in actions', () => {
  afterEach(() => {
    moxios.reset();
  });

  describe('handleSocialAuth', () => {
    it('dispatches SIGN_IN_SUCCESS after authentication', () => {
      moxios.onGet(`${API}/auth/facebook`)
        .reply(200, {
          user: {
            id: 1,
            token: 'the.user.token'
          }
        });

      const expectedActions = [
        {
          type: types.SIGN_IN_LOADING,
          payload: true
        },
        {
          type: types.SIGN_IN_LOADING,
          payload: false
        },
        {
          type: types.SIGN_IN_SUCCESS,
          payload: {
            user: {
              id: 1,
              token: 'the.user.token'
            }
          }
        }
      ]

      const store = mockStore({comments: {}});
      return store.dispatch(handleSocialAuth('/auth/facebook'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('dispatches SIGN_IN_FAILURE if authentication fails', () => {
      moxios.onGet(`${API}/auth/facebook`)
        .reply(500, {
          user: {
            id: 1,
            token: 'the.user.token'
          }
        });

      const expectedActions = [
        {
          type: types.SIGN_IN_LOADING,
          payload: true
        },
        {
          type: types.SIGN_IN_LOADING,
          payload: false
        },
        {
          type: types.SIGN_IN_FAILURE,
          payload: {
            error: {
              message: "unable to sign in at this time"
            }
          }
        }
      ]

      const store = mockStore({comments: {}});
      return store.dispatch(handleSocialAuth('/auth/facebook'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('signIn', () => {
    it('dispatches SIGN_IN_SUCCESS after authentication', () => {
      moxios.onPost(`${API}/api/users/login`)
        .reply(200, {
          user: {
            id: 1,
            token: 'the.user.token'
          }
        });

      const expectedActions = [
        {
          type: types.SIGN_IN_LOADING,
          payload: true
        },
        {
          type: types.SIGN_IN_LOADING,
          payload: false
        },
        {
          type: types.SIGN_IN_SUCCESS,
          payload: {
            user: {
              id: 1,
              token: 'the.user.token'
            }
          }
        }
      ]

      const store = mockStore({comments: {}});
      return store.dispatch(signIn('/auth/facebook'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('dispatches SIGN_IN_FAILURE if authentication fails', () => {
      moxios.onPost(`${API}/api/users/login`)
        .reply(500, {
          error: {
            message: 'some server error'
          }
        });

      const expectedActions = [
        {
          type: types.SIGN_IN_LOADING,
          payload: true
        },
        {
          type: types.SIGN_IN_LOADING,
          payload: false
        },
        {
          type: types.SIGN_IN_FAILURE,
          payload: {
            error: {
              message: 'some server error'
            }
          }
        }
      ]

      const store = mockStore({comments: {}});
      return store.dispatch(signIn('/auth/facebook'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

});
