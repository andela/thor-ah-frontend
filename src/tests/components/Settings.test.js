import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Settings from "../../components/Settings/Settings";

const mockStore = configureMockStore();
const store = mockStore({});

describe("Settings Component", () => {
  test("renders the Settings Component", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Settings />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
