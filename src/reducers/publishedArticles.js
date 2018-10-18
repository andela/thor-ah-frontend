import initalState from '../store/initialState';
import {
  FETCH_PUBLISHED_ARTICLES_REQUEST,
  FETCH_PUBLISHED_ARTICLES_SUCCESS,
  FETCH_PUBLISHED_ARTICLES_FAILED,
} from '../actionTypes/publishedArticles';

const publishedArticles = (state = initalState.publishedArticles, action) => {
  switch (action.type) {
    case FETCH_PUBLISHED_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: [...action.payload]
      };
    case FETCH_PUBLISHED_ARTICLES_REQUEST:
      return {
        ...state,
        loading: action.payload,
      };
    case FETCH_PUBLISHED_ARTICLES_FAILED:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state;
  }
}

export default publishedArticles;
