import relatedArticle from "../../reducers/relatedArticle";
import * as types from "../../actionTypes/relatedArticle";

describe("relatedArticle reducer", () => {
  it("should return the initial state", () => {
    expect(relatedArticle(undefined, {})).toEqual({
      articles: [],
      loading: true,
      error: ""
    });
  });
  it("should handle FETCH_RELATED_ARTICLE_SUCCESS", () => {
    const action = {
      type: types.FETCH_RELATED_ARTICLE_SUCCESS,
      payload: []
    };
    expect(relatedArticle({}, action)).toEqual({
      articles: action.payload
    });
  });
  it("should handle FETCH_RELATED_ARTICLE_LOADING", () => {
    const action = {
      type: types.FETCH_RELATED_ARTICLE_LOADING,
      payload: { loading: true }
    };
    expect(relatedArticle({}, action)).toEqual({ loading: action.payload });
  });
  it("should handle FETCH_RELATED_ARTICLE_ERROR", () => {
    const action = {
      type: types.FETCH_RELATED_ARTICLE_ERROR,
      payload: "error"
    };
    expect(relatedArticle({}, action)).toEqual({
      error: action.payload
    });
  });
});
