import {
  ARTICLE_SEARCH_SUCCESS,
  ARTICLE_SEARCH_LOADING,
  ARTICLE_SEARCH_ERROR
} from '../actionTypes/articleSearch';
import initialState from '../store/initialState'

const articleSearch = (state = initialState.articleSearch, action) => {
  switch (action.type) {
    case ARTICLE_SEARCH_SUCCESS:
      return {
        ...state,
        articles: action.payload,
        error: false,
        loading: false
      }
    case ARTICLE_SEARCH_LOADING:
      return {
        ...state,
        loading: true
      }
    case ARTICLE_SEARCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    default:
      return state;
  }
}

export default articleSearch;
