import React from "react";
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import UpdateArticle from '../../containers/UpdateArticle/UpdateArticle';


describe('UpdateArticle Container', () => {
  test("renders the UpdateArticle Container", () => {
    const wrapper = shallow(
      <Provider>
        <UpdateArticle />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
