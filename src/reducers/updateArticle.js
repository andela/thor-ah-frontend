import initialState from '../store/initialState';
import * as types from '../actionTypes/updateArticle';

const updateArticleReducer = (state = initialState.articleUpdate, action) => {
  switch (action.type) {
    case types.UPDATE_ARTICLE: {
      return {
        ...state,
        loading: action.payload,
      }
    }
    case types.UPDATE_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        data: action.payload
      }
    case types.UPDATE_ARTICLE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
};


export default updateArticleReducer;
