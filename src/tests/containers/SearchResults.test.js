import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import SearchResults from '../../containers/SearchResults/SearchResults';

const mockStore = configureMockStore();
const store = mockStore();

const mockFunction = param => jest.fn(param);

describe('', () => {
  test('renders the search results', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <SearchResults 
          filterSearch={mockFunction}
        />
      </Provider>
    )
    expect(wrapper.exists()).toBe(true);
  })
});

