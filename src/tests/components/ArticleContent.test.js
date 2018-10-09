import React from "react";
import { shallow } from "enzyme";
import ArticleContent from "../../components/ArticleContent/ArticleContent";

describe("ArticleContent Component", () => {
  test("renders the ArticleContent Component", () => {
    const wrapper = shallow(<ArticleContent />);
    expect(wrapper.exists()).toBe(true);
  });
});
