import React from "react";
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';

import PublishedArticles from '../../components/PublishedArticles/PublishedArticles';

describe('PublishedArticles component', () => {
  test("renders the PublishedArticles component", () => {
    const wrapper = shallow(
      <Provider>
        <PublishedArticles />
      </Provider>
    );

    expect(wrapper.exists()).toBe(true);
  });
});
