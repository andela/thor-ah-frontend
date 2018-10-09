import React from "react";
import { shallow } from "enzyme";
import { create } from 'react-test-renderer';
import App from "../App";

describe("App Container", () => {
  test("renders the App without crashing", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });
});


it("create a snapshot", () => {
  const c = create(<App />);
  expect(c.toJSON()).toMatchSnapshot();
});

