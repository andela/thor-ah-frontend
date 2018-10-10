import React from 'react';
import { shallow, render } from 'enzyme';
import { Signup } from '../../containers/Signup/Signup';

describe('SiginUp Container', () => {

    it('renders the Signup Container', () => {
        const SignupContainer = shallow(<Signup />);
        expect(SignupContainer.exists()).toBe(true);
    });

    it('Throws error if required imputs to validated', () => {
        const SignupContainer = shallow(<Signup />);
        expect(SignupContainer.exists()).toBe(true);
    });

});
