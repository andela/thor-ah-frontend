import * as types from "../actionTypes/article";
// initial state
import initialState from "../store/initialState";

export const reactionCount = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_REACTION_COUNT:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export const oneArticleReducer = (
  state = initialState.article.oneArticle,
  action
) => {
  switch (action.type) {
    case types.FETCH_ARTICLE_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case types.FETCH_ARTICLE_SUCCESS:
      return {
        ...state,
        article: action.payload
      };
    case types.FETCH_ARTICLE_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case types.FETCH_REACTION_COUNT:
      return {
        ...state,
        reactions: reactionCount(state.reactions, action)
      };
    default:
      return state;
  }
};

export const allArticleReducer = (
  state = initialState.article.allArticle,
  action
) => {
  switch (action.type) {
    case types.FETCH_ARTICLES_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case types.FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        data: action.payload.articles,
        count: action.payload.pagination.totalRecords
      };
    case types.FETCH_ARTICLES_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export const featuredReducer = (
  state = initialState.article.featuredArticles,
  action
) => {
  switch (action.type) {
    case types.FETCH_FEATURED_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case types.FETCH_FEATURED_SUCCESS:
      return {
        ...state,
        data: action.payload.articles
      };
    case types.FETCH_FEATURED_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export const recommendedReducer = (
  state = initialState.article.recommendedArticles,
  action
) => {
  switch (action.type) {
    case types.FETCH_RECOMMENDED_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case types.FETCH_RECOMMENDED_SUCCESS:
      return {
        ...state,
        data: action.payload.articles,
        count: action.payload.pagination.totalRecords
      };
    case types.FETCH_RECOMMENDED_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
