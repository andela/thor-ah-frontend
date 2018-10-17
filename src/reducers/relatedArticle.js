import {
  FETCH_RELATED_ARTICLE_LOADING,
  FETCH_RELATED_ARTICLE_SUCCESS,
  FETCH_RELATED_ARTICLE_ERROR
} from "../actionTypes/relatedArticle";
import initialState from "../store/initialState";

export default function reducer(state = initialState.relatedArticles, action) {
  switch (action.type) {
    case FETCH_RELATED_ARTICLE_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case FETCH_RELATED_ARTICLE_SUCCESS:
      return {
        ...state,
        articles: action.payload
      };
    case FETCH_RELATED_ARTICLE_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
