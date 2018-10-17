import React from "react";
import { shallow } from "enzyme";
import { Favorite } from "../../components/Favorite/Favorite";

describe("Favorite Article Component", () => {
    test("renders the Favorite Article Component", () => {
        const wrapper = shallow(<Favorite setMsg={(msg) => (msg)} />);
        expect(wrapper.exists()).toBe(true);
    });
});
