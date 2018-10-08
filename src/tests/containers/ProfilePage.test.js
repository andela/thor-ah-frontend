import React from "react";
import { shallow } from 'enzyme';
import ProfilePage from '../../containers/ProfilePage';


describe('ProfilePage Container', () => {
  test("renders the ProfilePage Container", () => {
    const wrapper = shallow(<ProfilePage />);

    expect(wrapper.exists()).toBe(true);
  });
});
