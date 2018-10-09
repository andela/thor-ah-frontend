import React from 'react';
import { shallow } from "enzyme";
import ArticlePage from '../../containers/ArticlePage';

describe('ArticlePage Container', () => {
  test("renders the ArticlePage Container", () => {
    const wrapper = shallow(<ArticlePage />);
    expect(wrapper.exists()).toBe(true);
  });
});


