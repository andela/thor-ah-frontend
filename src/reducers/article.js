// initial state
import initialState from "../store/initialState";

import { 
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_ERROR,
  FETCH_ARTICLE_LOADING,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_ERROR,
  FETCH_ARTICLES_LOADING
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
        data: action.payload
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
