import React from "react";
import { shallow } from 'enzyme';


import FavoriteArticles from '../../components/FavoriteArticles/FavoriteArticles';

describe('FavoriteArticles component', () => {
  test("renders the FavoriteArticles component", () => {
    const wrapper = shallow(<FavoriteArticles />);

    expect(wrapper.exists()).toBe(true);
  });
})

