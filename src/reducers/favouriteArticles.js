import initialState from '../store/initialState';
import {
  FETCH_FAVOURITE_ARTICLES_REQUEST,
  FETCH_FAVOURITE_ARTICLES_SUCCESS,
  FETCH_FAVOURITE_ARTICLES_FAILED,
} from '../actionTypes/favouriteArticles';

const favouriteArticles = (state = initialState.favouriteArticles, action) => {
  switch (action.type) {
    case FETCH_FAVOURITE_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: action.payload,
        count: action.payload.pagination.totalRecords
      };
    case FETCH_FAVOURITE_ARTICLES_REQUEST:
      return {
        ...state,
        loading: action.payload,
      };
    case FETCH_FAVOURITE_ARTICLES_FAILED:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state;
  }
}

export default favouriteArticles;
