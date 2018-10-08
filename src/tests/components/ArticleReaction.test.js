import React from "react";
import { shallow } from "enzyme";
import ArticleReaction from "../../components/ArticleReaction/ArticleReaction";

describe("ArticleReaction Component", () => {
  test("renders the ArticleReaction Component", () => {
    const wrapper = shallow(<ArticleReaction />);
    expect(wrapper.exists()).toBe(true);
  });
});
