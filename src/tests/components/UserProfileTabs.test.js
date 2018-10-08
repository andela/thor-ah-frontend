import React from "react";
import { shallow } from 'enzyme';

import UserProfileTabs from '../../components/UserProfileTabs/UserProfileTabs';

describe('UserProfileTabs component', () => {
  test("renders the UserProfileTabs component", () => {
    const wrapper = shallow(<UserProfileTabs />);

    expect(wrapper.exists()).toBe(true);
  });
});
