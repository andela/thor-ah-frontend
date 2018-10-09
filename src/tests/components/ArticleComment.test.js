import React from "react";
import { shallow } from "enzyme";
import ArticleComment from "../../components/ArticleComment/ArticleComment";

describe("ArticleComment Component", () => {
  test("renders the ArticleComment Component", () => {
    const wrapper = shallow(<ArticleComment />);
    expect(wrapper.exists()).toBe(true);
  });
});
