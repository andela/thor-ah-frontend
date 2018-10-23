import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


import * as types from '../../actionTypes/updateUser';
import updateUser  from '../../actions/updateUser';

const API = process.env.REACT_APP_API;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockAxios = new MockAdapter(axios);

describe('update user action', () => {
  it('Update user', () => {
    mockAxios.onPut(`${API}/api/users`)
      .reply(200, {
        status: "success",
        user: {
          firstName: 'Uche',
          lastName: 'Jude',
          email: 'iamuchejude@gmail.com',
          image: 'https://iamuchejude.com/assets/images/me.png',
          twitter: 'https://twitter.com/iamuchejude',
          linkedin: 'https://linkedin.com/in/iamuchejude',
          bio: 'Software Developer at Andela',
        },
      });

      const user = {
        firstName: 'Uche',
        lastName: 'Jude',
        email: 'iamuchejude@gmail.com',
        image: 'https://iamuchejude.com/assets/images/me.png',
        twitter: 'https://twitter.com/iamuchejude',
        linkedin: 'https://linkedin.com/in/iamuchejude',
        bio: 'Software Developer at Andela',
      }

      const expectedActions = [
        {
          type: types.UPDATE_USER_INFO_REQUEST,
          payload: true
        },
        {
          type: types.UPDATE_USER_INFO_SUCCESS,
          payload: {
            firstName: 'Uche',
            lastName: 'Jude',
            email: 'iamuchejude@gmail.com',
            image: 'https://iamuchejude.com/assets/images/me.png',
            twitter: 'https://twitter.com/iamuchejude',
            linkedin: 'https://linkedin.com/in/iamuchejude',
            bio: 'Software Developer at Andela',
          },
        },
        {
          type: types.UPDATE_USER_INFO_REQUEST,
          payload: false,
        }
      ]

    const store = mockStore({auth: []});
    return store.dispatch(updateUser(user))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
