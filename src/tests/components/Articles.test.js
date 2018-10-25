import React from "react";
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Articles from '../../components/Articles/Articles';

const mockStore = configureMockStore();
const store = mockStore({});
describe('Articles Component', () => {
  test("renders the Articles Component", () => {
    const wrapper = shallow(
      <Provider>
        <Articles store={store}/>
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
