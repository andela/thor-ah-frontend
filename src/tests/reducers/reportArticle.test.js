import reportArticle from "../../reducers/reportArticle";
import * as types from "../../actionTypes/reportArticle";

describe("report article reducer", () => {
  it("should return initial state", () => {
    expect(reportArticle(undefined, {})).toEqual({
      error: "",
      loading: false,
      message: ""
    });
  });

  it("should dispatch REPORT_ARTICLE_LOADING", () => {
    const action = { type: types.REPORT_ARTICLE_LOADING, payload: true };
    expect(reportArticle({}, action)).toEqual({});
  });

  it("shounld dispatch REPORT_ARTICLE_SUCCESS", () => {
    const action = {
      type: types.REPORT_ARTICLE_SUCCESS,
      payload: {
        message: "",
        error: false,
        loading: false
      }
    };
    expect(reportArticle({}, action)).toEqual({});
  });

  it('dispatches REPORT_SEARCH_ERROR', () => {
    const action = {
      type: types.REPORT_ARTICLE_ERROR,
      payload: 'error'
    };
    expect(reportArticle({}, action)).toEqual({})
  });
});
