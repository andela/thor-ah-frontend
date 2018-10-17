import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import RelatedArticle from "../../components/RelatedArticle/RelatedArticle";

const mockStore = configureMockStore();
const store = mockStore({});

describe("RelatedArticle Component", () => {
  test("renders the RelatedArticle Component", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <RelatedArticle />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
