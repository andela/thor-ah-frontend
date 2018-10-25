import React from "react";
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';

import UserPassword from '../../components/UpdateProfile/UserPassword';

describe('UserFollow component', () => {
  test("renders the UserFollow component", () => {
    const wrapper = shallow(
      <Provider>
        <UserPassword/>
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
