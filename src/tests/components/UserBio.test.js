import React from "react";
import { shallow } from 'enzyme';


import UserBio from '../../components/UserBio/UserBio';

describe('UserBio component', () => {
  test("renders the UserBio component", () => {
    const wrapper = shallow(<UserBio />);

    expect(wrapper.exists()).toBe(true);
  });
});
