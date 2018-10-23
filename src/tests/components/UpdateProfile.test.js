import React from "react";
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';

import UpdateProfile from '../../components/UpdateProfile/UpdateProfile';

describe('UserFollow component', () => {
  test("renders the UserFollow component", () => {
    const wrapper = shallow(
      <Provider>
        <UpdateProfile/>
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
