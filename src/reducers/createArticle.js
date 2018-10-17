import {
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_ERROR,
  CREATE_ARTICLE_LOADING
} from "../actionTypes/createArticle";
import initialState from "../store/initialState";

const createArticle = (state = initialState.createArticle, action) => {
  switch (action.type) {
    case CREATE_ARTICLE_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case CREATE_ARTICLE_SUCCESS:
      return {
        ...state,
        article: action.payload
      };
    case CREATE_ARTICLE_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}

export default createArticle;
