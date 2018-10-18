import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import ArticlePage from "../../containers/ArticlePage";

const mockStore = configureMockStore();
const store = mockStore({});
describe("ArticlePage Container", () => {
  test("renders the ArticlePage Container", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ArticlePage />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
