import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import initialState from '../../store/initialState';
import UserBio from '../../components/UserBio/UserBio';

const state = {
  ...initialState,
  userProfile: {
    user: {
      name: 'john'
    },
    loading: false,
  },
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

describe('UserBio component', () => {
  const wrapper = mount(
    <Provider store={store}>
      <UserBio />
    </Provider>
  );

  it("renders the UserBio component", () => {
    expect(wrapper.exists()).toBe(true);
  });


  it("renders the UserBio component for other users", () => {
    const mountedComponent = mount(
      <Provider store={store}>
        <UserBio viewOtherUser/>
      </Provider>
    );
    expect(mountedComponent.exists()).toBe(true);
  });
});
