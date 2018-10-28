import React from "react";
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import HeroFeatured from '../../components/HeroFeatured/HeroFeatured';
import initialState from '../../store/initialState';


const state = {
  ...initialState,
  featuredReducer: {
    data: [],
  }
}

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(state);

describe('HeroFeatured Component', () => {
  test("renders the HeroFeatured Component", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <HeroFeatured/>
        </Router>
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
