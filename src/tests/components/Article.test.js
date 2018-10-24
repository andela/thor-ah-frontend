import React from "react";
import { shallow } from "enzyme";
import Article from "../../components/Article/Article";

const mockDetails = {
  author: 'myName', 
  timeToRead: 7, 
  date: new Date()
}
describe("Article Component", () => {
  test("renders the Article Component", () => {
    const wrapper = shallow(<Article details={mockDetails}/>);
    expect(wrapper.exists()).toBe(true);
  });
});
