import React from "react";
import { shallow } from 'enzyme';

import HeroArticles from '../../components/HeroFeatured/HeroArticles';

const props = {
  title: 'some title',
  slug: 'some slug',
  details: {
    author: 'the author',
    profileUrl: 'the url'
  }
}

describe('HeroArticles component', () => {
  test("renders the HeroArticles component", () => {
    const { title, slug, details } = props;
    const wrapper = shallow(
      <HeroArticles title={title} slug={slug} details={details} />
    );
    expect(wrapper.exists()).toBe(true);
  });
});
