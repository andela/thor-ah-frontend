import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Following from '../../containers/Following/Following';
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

describe('Following Component', () => {
  test('renders the Following Component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Following />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
