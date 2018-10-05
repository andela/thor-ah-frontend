import React from "react";
import { shallow } from 'enzyme';

import SocialSignup from '../../components/SocialSignup';

describe('SocialSignup component', () => {
    test("renders the SocialSignUp component", () => {
        const wrapper = shallow(<SocialSignup />);

        expect(wrapper.exists()).toBe(true);
    });
});
