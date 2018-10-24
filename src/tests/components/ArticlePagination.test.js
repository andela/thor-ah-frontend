import React from "react";
import { shallow } from "enzyme";
import ArticlesPagination from '../../components/ArticlesPagination/ArticlesPagination';


describe("ArticlesPagination Component", () => {
  test("renders the ArticlesPagination Component", () => {
    const wrapper = shallow(<ArticlesPagination />);
    expect(wrapper.exists()).toBe(true);
  });
});
