import React from "react";
import { shallow } from "enzyme";
import SignIn from "../containers/SignIn/SignIn";

 describe("SiginIn Component", () => {
  test("renders the SignIn Component", () => {
    const wrapper = shallow(<SignIn />);
    expect(wrapper.exists()).toBe(true);
  });
});
