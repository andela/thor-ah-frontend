import initialState from '../store/initialState';
import * as types from '../actionTypes/reportArticle';

const reportArticle = (state = initialState.reportArticle, action) => {
  switch (action.types) {
    case types.REPORT_ARTICLE_SUCCESS:
      return {
        ...state,
        message: action.payload,
        error: false,
        loading: false,
      }
    case types.REPORT_ARTICLE_LOADING:
      return {
        ...state,
        loading: true,
      }
    case types.REPORT_ARTICLE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
  
    default:
      return state;
  }
};

export default reportArticle;
