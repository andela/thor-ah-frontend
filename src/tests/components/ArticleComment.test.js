import React from "react";
import { shallow } from "enzyme";
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
    const wrapper = shallow(
      <ArticleComment fetchingArticleComments fetchArticleComments={mockFunction} />
    );
    expect(wrapper.find('i').exists()).toBe(true);
  });
});
