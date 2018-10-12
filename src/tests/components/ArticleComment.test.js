import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import ConnectedArticleComment, { ArticleComment } from "../../components/ArticleComment/ArticleComment";

const mockStore = configureMockStore();
const store = mockStore({
  comments: {
    fetchingArticleComments: true,
  }
});

const mockFunction = param => jest.fn(param);

describe("ArticleComment Component", () => {
  test("renders the ArticleComment Component", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ConnectedArticleComment fetchArticleComments={mockFunction} />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  test("renders the a loading spinner Component", () => {
    const wrapper = mount(
      <Provider store={store}>
        <ArticleComment fetchingArticleComments fetchArticleComments={mockFunction} />
      </Provider>
    );
    expect(wrapper.find('i').exists()).toBe(true);
  });
});
