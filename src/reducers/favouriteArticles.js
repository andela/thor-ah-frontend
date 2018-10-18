import initalState from '../store/initialState';
import {
  FETCH_FAVOURITE_ARTICLES_REQUEST,
  FETCH_FAVOURITE_ARTICLES_SUCCESS,
  FETCH_FAVOURITE_ARTICLES_FAILED,
} from '../actionTypes/favouriteArticles';

const favouriteArticles = (state = initalState.favouriteArticles, action) => {
  switch (action.type) {
    case FETCH_FAVOURITE_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: [...action.payload]
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
