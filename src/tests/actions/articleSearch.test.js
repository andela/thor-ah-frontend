import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import articleSearch from "../../actions/articleSearch";

const API = process.env.REACT_APP_API;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockAdapter = new MockAdapter(axios);

describe("category actions", () => {
  describe("get articles by searching by keywords, tags or authors", () => {
    const keywords = "Software Development";
    it("gets articles by keywords", () => {
      mockAdapter
        .onGet(`${API}/api/articles/search?keywords=${keywords}`)
        .reply(200, {
          status: "success",
          articles: [
            [
              {
                id: 1,
                title: "Sample Title",
                description: "Sample description",
                body: "Sample body"
              }
            ]
          ]
        });
      const expectedAction = [
        { payload: true, type: "ARTICLE_SEARCH_LOADING" },
        { payload: false, type: "ARTICLE_SEARCH_LOADING" },
        {
          payload: "No results found for software. Please try again.",
          type: "ARTICLE_SEARCH_ERROR"
        }
      ];

      const store = mockStore({
        articleSearch: [
          {
            id: 1,
            title: "Sample Title",
            description: "Sample description",
            body: "Sample body"
          }
        ]
      });
      return store.dispatch(articleSearch("keywords", "software")).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });
});
