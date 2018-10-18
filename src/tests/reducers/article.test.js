import { oneArticleReducer, allArticleReducer } from "../../reducers/article";
import * as types from "../../actionTypes/article";

describe("article reducer", () => {
  it("should return initial state", () => {
    expect(oneArticleReducer(undefined, {})).toEqual({
      article: {
        author: {},
        tags: [{}]
      },
      loading: false,
      error: ""
    });
  });
  it("should handle FETCH_ARTICLE_SUCCESS", () => {
    const action = {
      type: types.FETCH_ARTICLE_SUCCESS,
      payload: {
        article: {
          id: 2,
          title: "staying fit",
          description: "fitness",
          body:
            "To stay fit, eat well, exercise daily and visit your doctor monthly"
        }
      }
    };
    expect(oneArticleReducer({}, action)).toEqual({ article: action.payload });
  });
  it("should handle FETCH_ARTICLE_LOADING", () => {
    const action = {
      type: types.FETCH_ARTICLE_LOADING,
      payload: { loading: true }
    };
    expect(oneArticleReducer({}, action)).toEqual({
      loading: action.payload
    });
  });
  it("should handle FETCH_ARTICLE_ERROR", () => {
    const action = {
      type: types.FETCH_ARTICLE_ERROR,
      payload: "error"
    };
    expect(oneArticleReducer({}, action)).toEqual({
      error: action.payload
    });
  });

  it("should return initial state", () => {
    expect(allArticleReducer(undefined, {})).toEqual({
      isLoading: false,
      error: false,
      data: [],
    });
  });
  it("should handle FETCH_ARTICLES_SUCCESS", () => {
    const action = {
      type: types.FETCH_ARTICLES_SUCCESS,
      payload: {
        data: [
          {
            id: 0,
            title: "taying fit",
            description: "A short story about a life well lived of Raquel"
          },
          {
            id: 1,
            title: "stayin fit",
            description: "A short story about a life well lived of Raquel"
          },
          {
            id: 2,
            title: "stayng fit",
            description: "A short story about a life well lived of Raquel"
          },
        ]
      }
    };
    expect(allArticleReducer({}, action)).toEqual({ data: action.payload });
  });
  it("should handle FETCH_ARTICLES_LOADING", () => {
    const action = {
      type: types.FETCH_ARTICLES_LOADING,
      payload: { isLoading: true }
    };
    expect(allArticleReducer({}, action)).toEqual({
      isLoading: action.payload
    });
  });
  it("should handle FETCH_ARTICLES_ERROR", () => {
    const action = {
      type: types.FETCH_ARTICLES_ERROR,
      payload: "error"
    };
    expect(allArticleReducer({}, action)).toEqual({
      error: action.payload
    });
  });
});
