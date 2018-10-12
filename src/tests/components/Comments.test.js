import React from "react";
import { shallow } from "enzyme";
import Comments from "../../components/Comment/Comments"
import Comment from "../../components/Comment/Comment"

describe("Comments Component", () => {
  test("renders the Comments Component", () => {
    const wrapper = shallow(<Comments comments={[]} />);
    expect(wrapper.exists()).toBe(true);
  });

  test("renders comments", () => {
    const wrapper = shallow(<Comments comments={['one']} />);
    expect(wrapper.find(Comment)).toHaveLength(1);
  });

  test("renders article title", () => {
    const wrapper = shallow(<Comments currentArticleTitle="The Article" comments={['one']} />);
    expect(wrapper.find('p')).toHaveLength(1);
  });
});
