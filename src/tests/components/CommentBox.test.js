import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import CommentBox from "../../components/Comment/CommentBox"
// import Comment from "../../components/Comment/Comment"

const state = {
  comments: {
    newComment: {
      loading: true,
    }
  }
}
const mockStore = configureMockStore();
const store = mockStore(state);

describe("CommentBox Component", () => {
  test("renders the CommentBox Component", () => {
    const wrapper = mount(
      <Provider store={store}>
        <CommentBox />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
