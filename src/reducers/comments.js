import initialState from '../store/initialState';
import * as types from '../actionTypes/comments';

const comments = (state = initialState.comments, action) => {
  switch (action.type) {
    case types.CREATE_COMMENT_REQUEST:
      return {
        ...state,
        postingNewComment: action.payload,
      }
    case types.CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        currentArticleComments: [...state.currentArticleComments, action.payload],
      }
    case types.CREATE_COMMENT_FAILED:
      return {
        ...state,
        commentError: action.payload,
      }
    case types.FETCH_ARTICLE_COMMENTS_LOADING:
      return {
        ...state,
        fetchingArticleComments: action.payload,
      }
    case types.FETCH_ARTICLE_COMMENTS_SUCCESS:
      return {
        ...state,
        currentArticleComments: action.payload,
      }
    case types.FETCH_ARTICLE_COMMENTS_FAILURE:
      return {
        ...state,
        fetchingCommentsError: action.payload,
      }
    default:
      return state;
  }

};

export default comments;
