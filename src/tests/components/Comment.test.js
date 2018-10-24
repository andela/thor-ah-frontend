import React from "react";
import { mount } from "enzyme";
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Comment from "../../components/Comment/Comment";
import initialState from '../../store/initialState';

const state = {
  ...initialState,
}

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(state);

describe("Comment Component", () => {
  test("renders the Comment Component", () => {
    const comment = {
      commenter: {
        firstName: 'John'
      }
    }
    const wrapper = mount(
      <Provider store={store}>
        <Comment comment={comment} />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
