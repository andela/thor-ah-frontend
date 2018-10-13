import initialState from '../store/initialState';
import * as types from '../actionTypes/comments';

const { comments } = initialState;

export const articleComments = (state = comments.articleComments, action) => {
  switch (action.type) {
    case types.FETCH_ARTICLE_COMMENTS_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    case types.FETCH_ARTICLE_COMMENTS_SUCCESS:
      return {
        ...state,
        data: action.payload
      }
    case types.FETCH_ARTICLE_COMMENTS_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    case types.CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        data: [action.payload, ...state.data],
      }
    default:
      return state;
  }
}

export const newComment = (state = comments.newComment, action) => {
  switch (action.type) {
    case types.CREATE_COMMENT_REQUEST:
      return {
        ...state,
        loading: action.payload,
      }
    case types.CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        data: action.payload,
      }
    case types.CREATE_COMMENT_FAILED:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state;
  }
};
