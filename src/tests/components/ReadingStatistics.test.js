import React from "react";
import { shallow } from 'enzyme';


import ReadingStatistics from '../../components/ReadingStatistics/ReadingStatistics';

describe('ReadingStatistics component', () => {
  test("renders the ReadingStatistics component", () => {
    const wrapper = shallow(<ReadingStatistics />);

    expect(wrapper.exists()).toBe(true);
  });
});
