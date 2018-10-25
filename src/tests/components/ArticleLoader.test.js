import React from "react";
import { shallow } from "enzyme";
import ArticleLoader from "../../components/ArticleLoader";


describe("ArticleLoader Component", () => {
  test("renders the ArticleLoader Component", () => {
    const wrapper = shallow(<ArticleLoader />);
    expect(wrapper.exists()).toBe(true);
  });
});
