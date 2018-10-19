import React from "react";
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';

import UserProfileTabs from '../../components/UserProfileTabs/UserProfileTabs';

describe('UserProfileTabs component', () => {
  test("renders the UserProfileTabs component", () => {
    const wrapper = shallow(
      <Provider>
        <UserProfileTabs />
      </Provider>
    );

    expect(wrapper.exists()).toBe(true);
  });
});
