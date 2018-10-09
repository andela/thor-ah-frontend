import React from "react";
import { shallow } from "enzyme";
import RelatedArticle from "../../components/RelatedArticle/RelatedArticle";

describe("RelatedArticle Component", () => {
  test("renders the RelatedArticle Component", () => {
    const wrapper = shallow(<RelatedArticle />);
    expect(wrapper.exists()).toBe(true);
  });
});
