import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import CommentBox from "../../components/Comment/CommentBox"
// import Comment from "../../components/Comment/Comment"

const mockStore = configureMockStore();
const store = mockStore({});

describe("CommentBox Component", () => {
  test("renders the CommentBox Component", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <CommentBox />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
