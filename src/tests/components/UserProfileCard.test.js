import React from "react";
import { shallow } from 'enzyme';

import UserProfileCard from '../../components/UserProfileCard/UserProfileCard';

const user = {
  username: 'jdoe',
  firstName: 'Jon',
  lastName: 'Doe',
}

describe('UserProfileCard component', () => {
  test("renders the UserProfileCard component", () => {
    const wrapper = shallow(
      <UserProfileCard user={user} />
    );
    expect(wrapper.exists()).toBe(true);
  });
});
