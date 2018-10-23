import React from "react";
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';

import UserInfo from '../../components/UpdateProfile/UserInfo';

describe('UserFollow component', () => {
  test("renders the UserFollow component", () => {
    const wrapper = shallow(
      <Provider>
        <UserInfo/>
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
