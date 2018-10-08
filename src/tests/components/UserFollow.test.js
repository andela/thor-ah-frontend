import React from "react";
import { shallow } from 'enzyme';

import UserFollow from '../../components/UserFollow/UserFollow';

describe('UserFollow component', () => {
  test("renders the UserFollow component", () => {
    const wrapper = shallow(<UserFollow />);

    expect(wrapper.exists()).toBe(true);
  });
});
