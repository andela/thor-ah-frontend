// initial state
import initialState from "../store/initialState";

import { 
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_ERROR,
  FETCH_ARTICLE_LOADING,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_ERROR,
  FETCH_ARTICLES_LOADING,
  FETCH_FEATURED_LOADING,
  FETCH_FEATURED_SUCCESS,
  FETCH_FEATURED_ERROR,
  FETCH_RECOMMENDED_LOADING,
  FETCH_RECOMMENDED_SUCCESS,
  FETCH_RECOMMENDED_ERROR,
} from "../actionTypes/article";

export const oneArticleReducer = (state = initialState.article.oneArticle, action) => {
  switch (action.type) {
    case FETCH_ARTICLE_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case FETCH_ARTICLE_SUCCESS:
      return {
        ...state,
        article: action.payload
      };
    case FETCH_ARTICLE_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

export const allArticleReducer = (state = initialState.article.allArticle, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        data: action.payload.articles,
        count: action.payload.pagination.totalRecords
      };
    case FETCH_ARTICLES_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}

export const featuredReducer = (state = initialState.article.featuredArticles, action) => {
  switch (action.type) {
    case FETCH_FEATURED_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case FETCH_FEATURED_SUCCESS:
      return {
        ...state,
        data: action.payload.articles
      };
    case FETCH_FEATURED_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}

export const recommendedReducer = (state = initialState.article.recommendedArticles, action) => {
  switch (action.type) {
    case FETCH_RECOMMENDED_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case FETCH_RECOMMENDED_SUCCESS:
      return {
        ...state,
        data: action.payload.articles,
        count: action.payload.pagination.totalRecords
      };
    case FETCH_RECOMMENDED_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}
