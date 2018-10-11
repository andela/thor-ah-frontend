import {
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_FAILURE,
  CREATE_ARTICLE_LOADING
} from "../actionTypes/article";
import initialState from "../store/initialState";

export default function reducer(state = initialState.article, action) {
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
      }
    default:
      return state;
  }
}
