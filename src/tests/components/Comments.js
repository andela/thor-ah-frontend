import React from "react";
import { shallow } from "enzyme";
import Comments from "../../components/Comment/Comments"
import Comment from "../../components/Comment/Comment"

describe("Comments Component", () => {
  test("renders the Comments Component", () => {
    const wrapper = shallow(<Comments />);
    expect(wrapper.exists()).toBe(true);
  });

  test("renders comments", () => {
    const wrapper = shallow(<Comments comments={[]} />);
    expect(wrapper.find(Comment)).toBe(false);
  });
});
