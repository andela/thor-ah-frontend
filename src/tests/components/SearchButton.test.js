import React from 'react';
import { shallow } from 'enzyme';
import SearchButton from '../../components/SearchButton/SearchButton';

describe('SearchButton Component', () => {
  test('renders the SearchButton Component', () =>{
    const wrapper = shallow(<SearchButton />);
    expect(wrapper.exists()).toBe(true);
  })
});
