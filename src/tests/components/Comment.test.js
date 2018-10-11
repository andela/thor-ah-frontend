import React from "react";
import toJson from 'enzyme-to-json';
import { shallow } from "enzyme";
import Comment from "../../components/Comment/Comment";

describe("Comment Component", () => {
  test("renders the Comment Component", () => {
    const comment = {
      commenter: {
        firstName: 'John'
      }
    }
    const wrapper = shallow(<Comment comment={comment} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
