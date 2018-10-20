import React from "react";
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import Drafts from '../../containers/Drafts/Drafts';


describe('Drafts Container', () => {
  test("renders the Drafts Container", () => {
    const wrapper = shallow(
      <Provider>
        <Drafts />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
