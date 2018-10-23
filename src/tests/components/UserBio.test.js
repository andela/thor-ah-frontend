import React from "react";
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';


import UserBio from '../../components/UserBio/UserBio';

describe('UserBio component', () => {
  const wrapper = shallow(
    <Provider>
      <UserBio />
    </Provider>
  );

  it("renders the UserBio component", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
