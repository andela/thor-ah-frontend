import React from 'react';
import { shallow } from "enzyme";
import Homepage from '../../containers/Home/Home';

describe('HomePage Container', () => {
  test("renders the HomePage Container", () => {
    const wrapper = shallow(<Homepage />);
    expect(wrapper.exists()).toBe(true);
  });
});


