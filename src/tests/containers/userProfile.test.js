import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import UsersProfile from '../../containers/UsersProfile/UsersProfile'
import initialState from '../../store/initialState';

const state = {
  ...initialState,
}

const match = {
  params: {
    username: 'jon'
  }
}

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(state);

describe('UsersProfile Component', () => {
  test('renders the UsersProfile Component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <UsersProfile match={match} />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
