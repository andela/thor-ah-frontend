import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Followers from '../../containers/Followers/Followers';
import initialState from '../../store/initialState';

const state = {
  ...initialState,
  uploadPhoto: {
    error: ''
  },
  userStore: {
    user: {}
  },
}

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(state);

describe('Followers Component', () => {
  test('renders the Followers Component', () => {
    const wrapper =  mount(
      <Provider store={store}>
        <Followers />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
