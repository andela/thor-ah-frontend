import React from "react";
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';


import FavoriteArticles from '../../components/FavoriteArticles/FavoriteArticles';

describe('FavoriteArticles component', () => {
  test("renders the FavoriteArticles component", () => {
    const wrapper = shallow(
      <Provider>
        <FavoriteArticles />
      </Provider>  
    );

    expect(wrapper.exists()).toBe(true);
  });
})

