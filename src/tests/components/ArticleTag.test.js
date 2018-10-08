import React from "react";
import { shallow } from "enzyme";
import ArticleTag from "../../components/ArticleTag/ArticleTag";

describe("ArticleTag Component", () => {
  test("renders the ArticleTag Component", () => {
    const wrapper = shallow(<ArticleTag />);
    expect(wrapper.exists()).toBe(true);
  });
});
