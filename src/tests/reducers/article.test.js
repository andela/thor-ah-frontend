import {
  oneArticleReducer,
  allArticleReducer,
  featuredReducer,
  recommendedReducer,
  reactionCount
} from "../../reducers/article";
import * as types from "../../actionTypes/article";

describe("article reducer", () => {
  it("should return initial state", () => {
    expect(oneArticleReducer(undefined, {})).toEqual({
      article: {
        author: {},
        tags: [{}]
      },
      reactions: {
        likes: 0,
        dislikes: 0
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
      count: 0
    });
  });
  it("should handle FETCH_ARTICLES_SUCCESS", () => {
    const action = {
      type: types.FETCH_ARTICLES_SUCCESS,
      payload: {
        articles: [
          {
            author: {
              username: "randomAuthor2",
              email: "author2@mail.com",
              bio: null,
              image: null
            },
            authorId: 3,
            createdAt: "2018-10-21T13:22:28.965Z",
            description: "vcybunjecbuencjkec nece de ev",
            id: 12,
            slug: "Hello813832",
            tags: [],
            timeToRead: 1,
            title: "Hello",
            updatedAt: "2018-10-21T13:22:28.965Z"
          }
        ],
        pagination: {
          currentPage: 1,
          currentPageSize: 4,
          totalPages: 3,
          totalRecords: 3
        },
        status: "success"
      }
    };
    expect(allArticleReducer({}, action)).toEqual({
      data: action.payload.articles,
      count: action.payload.pagination.totalRecords
    });
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

  it("should return initial state", () => {
    expect(featuredReducer(undefined, {})).toEqual({
      isLoading: false,
      error: "",
      data: []
    });
  });
  it("should handle FETCH_FEATURED_SUCCESS", () => {
    const action = {
      type: types.FETCH_FEATURED_SUCCESS,
      payload: {
        articles: [
          {
            author: {
              username: "randomAuthor2",
              email: "author2@mail.com",
              bio: null,
              image: null
            },
            authorId: 3,
            createdAt: "2018-10-21T13:22:28.965Z",
            description: "vcybunjecbuencjkec nece de ev",
            id: 12,
            slug: "Hello813832",
            tags: [],
            timeToRead: 1,
            title: "Hello",
            updatedAt: "2018-10-21T13:22:28.965Z"
          }
        ],
        status: "success"
      }
    };
    expect(featuredReducer({}, action)).toEqual({
      data: action.payload.articles
    });
  });
  it("should handle FETCH_FEATURED_LOADING", () => {
    const action = {
      type: types.FETCH_FEATURED_LOADING,
      payload: { isLoading: true }
    };
    expect(featuredReducer({}, action)).toEqual({
      isLoading: action.payload
    });
  });
  it("should handle FETCH_FEATURED_ERROR", () => {
    const action = {
      type: types.FETCH_FEATURED_ERROR,
      payload: "error"
    };
    expect(featuredReducer({}, action)).toEqual({
      error: action.payload
    });
  });

  it("should return initial state", () => {
    expect(recommendedReducer(undefined, {})).toEqual({
      isLoading: false,
      error: "",
      data: [],
      count: 0
    });
  });
  it("should handle FETCH_RECOMMENDED_SUCCESS", () => {
    const action = {
      type: types.FETCH_RECOMMENDED_SUCCESS,
      payload: {
        articles: [
          {
            author: {
              username: "randomAuthor2",
              email: "author2@mail.com",
              bio: null,
              image: null
            },
            authorId: 3,
            createdAt: "2018-10-21T13:22:28.965Z",
            description: "vcybunjecbuencjkec nece de ev",
            id: 12,
            slug: "Hello813832",
            tags: [],
            timeToRead: 1,
            title: "Hello",
            updatedAt: "2018-10-21T13:22:28.965Z"
          }
        ],
        pagination: {
          currentPage: 1,
          currentPageSize: 4,
          totalPages: 3,
          totalRecords: 3
        },
        status: "success"
      }
    };
    expect(recommendedReducer({}, action)).toEqual({
      data: action.payload.articles,
      count: action.payload.pagination.totalRecords
    });
  });
  it("should handle FETCH_RECOMMENDED_LOADING", () => {
    const action = {
      type: types.FETCH_RECOMMENDED_LOADING,
      payload: { isLoading: true }
    };
    expect(recommendedReducer({}, action)).toEqual({
      isLoading: action.payload
    });
  });
  it("should handle FETCH_RECOMMENDED_ERROR", () => {
    const action = {
      type: types.FETCH_RECOMMENDED_ERROR,
      payload: "error"
    };
    expect(recommendedReducer({}, action)).toEqual({
      error: action.payload
    });
  });
  it("should handle FETCH_REACTION_COUNT", () => {
    const action = {
      type: types.FETCH_REACTION_COUNT,
      reactions: { reactions: { dislikes: 1, likes: 0 } }
    };
    expect(reactionCount({}, action)).toEqual({ reactions: action.payload });
  });
});
