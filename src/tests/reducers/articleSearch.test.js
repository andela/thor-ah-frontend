import articleSearch from "../../reducers/articleSearch";
import * as types from "../../actionTypes/articleSearch";

describe("article search reducer", () => {
  it("should return initial state", () => {
    expect(articleSearch(undefined, {})).toEqual({
      articles: [],
      error: "",
      loading: false
    });
  });

  it("should dispatch ARTICLE_SEARCH_LOADING", () => {
    const action = { type: types.ARTICLE_SEARCH_LOADING, payload: true };
    expect(articleSearch({}, action)).toEqual({ loading: true });
  });

  it("should dispatch ARTICLE_SEARCH_SUCCESS", () => {
    const action = {
      type: types.ARTICLE_SEARCH_SUCCESS,
      payload: {
        articles: [],
        error: false,
        loading: false
      }
    };
    expect(articleSearch({}, action)).toEqual({
      articles: { articles: [], error: false, loading: false },
      error: false,
      loading: false
    });
  });

  it("dispatches ARTICLE_SEARCH_ERROR", () => {
    const action = {
      type: types.ARTICLE_SEARCH_ERROR,
      payload: "error"
    };
    expect(articleSearch({}, action)).toEqual({
      error: 'error',
      loading: false
    })
  });
});
