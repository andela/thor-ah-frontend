import React from "react";
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';


import ReadingStatistics from '../../components/ReadingStatistics/ReadingStatistics';

describe('ReadingStatistics component', () => {
  test("renders the ReadingStatistics component", () => {
    const wrapper = shallow(
      <Provider>
        <ReadingStatistics />
      </Provider>
    );

    expect(wrapper.exists()).toBe(true);
  });
});
