import React from "react";
import { shallow } from "enzyme";
import { SignIn } from "../containers/SignIn/SignIn";

describe("SiginIn Component", () => {
  test("renders the SignIn Component", () => {
    const wrapper = shallow(<SignIn />);
    expect(wrapper.exists()).toBe(true);
  });

  // it('throws error message if an error is returned', () => {
  //   const wrapper = render(<SignIn error={{mesage: "invalid email or password" }} />);
  //   // const errorElem = wrapper.find('#invalid-credential');
  //   // expect(errorElem.exists()).toBe(true);
  //   console.log("================>", wrapper);
  //   expect(wrapper.find('p#invalid-credential')).to.have.length(1);
  // })

  // describe('signin component', () => {
  //   it('should successfully sign a user in', () => {
  //     expect(auth(undefined, {})).toEqual({
  //       isAuthenticated: true,
  //       user: {},
  //     });
  //   });
  // });
});
