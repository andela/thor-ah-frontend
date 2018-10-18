import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import getRelatedArticle from "../../actions/relatedArticle";
import * as types from "../../actionTypes/relatedArticle";

const API = process.env.REACT_APP_API;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const moxios = new MockAdapter(axios);

describe("getRelatedArticle", () => {
  it("dispatches FETCH_RELATED_ARTICLE_SUCCESS", () => {
    moxios
      .onGet(`${API}/api/articles/search`, {
        params: { tag: "walker" }
      })
      .reply(200, {
        articles: [
          {
            id: 1,
            tag: "walker",
            articles: [
              {
                id: 1,
                title: "string"
              }
            ]
          }
        ]
      });
    const expectedActions = [
      { type: types.FETCH_RELATED_ARTICLE_LOADING, payload: true },
      { type: types.FETCH_RELATED_ARTICLE_LOADING, payload: false },
      {
        type: types.FETCH_RELATED_ARTICLE_SUCCESS,
        payload: [{ id: 1, title: "string" }]
      }
    ];
    const store = mockStore({ relatedArticles: {} });
    return store.dispatch(getRelatedArticle("walker")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it("dispatches FETCH_RELATED_ARTICLE_ERROR", () => {
    moxios
      .onGet(`${API}/api/articles/search`, { params: { tag: "walker" } })
      .networkError("server error");
    const store = mockStore({ relatedArticles: {} });
    return store.dispatch(getRelatedArticle("walker")).then(() => {
      const receivedActions = store.getActions();
      const failureAction = receivedActions.find(
        action => action.type === types.FETCH_RELATED_ARTICLE_ERROR
      );
      expect(failureAction).toBeTruthy();
    });
  });
});
