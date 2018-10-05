import React from 'react';
import { shallow, render } from 'enzyme';
import { SignUp } from '../../containers/Signup/SignUp';

describe('SiginUp Container', () => {

    it('renders the SignUp Container', () => {
        const SignupContainer = shallow(<SignUp />);
        expect(SignupContainer.exists()).toBe(true);
    });

    it('Throws error if required imputs to validated', () => {
        const SignupContainer = shallow(<SignUp />);
        expect(SignupContainer.exists()).toBe(true);
    });

});
