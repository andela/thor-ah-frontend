import React from "react";
import { shallow } from 'enzyme';

import PublishedArticles from '../../components/PublishedArticles/PublishedArticles';

describe('PublishedArticles component', () => {
  test("renders the PublishedArticles component", () => {
    const wrapper = shallow(<PublishedArticles />);

    expect(wrapper.exists()).toBe(true);
  });
});
