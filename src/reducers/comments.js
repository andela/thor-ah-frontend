import initialState from '../store/initialState';
import * as types from '../actionTypes/comments';

const { comments } = initialState;

const commentsData = (state = [], action) => {
  switch (action.type) {
    case types.LIKE_COMMENT:
      return state.map((comment, idx) => {
        if (idx === Number(action.key)) {
          return {
            ...comment,
            likesCount: comment.userLiked ? comment.likesCount - 1 : comment.likesCount + 1,
            dislikesCount: comment.userDisliked ? comment.dislikesCount - 1 : comment.dislikesCount,
            userLiked: comment.userLiked ? !comment.userLiked : true,
            userDisliked: comment.userDisliked ? !comment.userDisliked : comment.userDisliked,
          }
        }
        return comment
      });
    case types.DISLIKE_COMMENT:
      return state.map((comment, idx) => {
        if (idx === Number(action.key)) {
          return {
            ...comment,
            dislikesCount: comment.userDisliked ? comment.dislikesCount - 1 : comment.dislikesCount + 1,
            likesCount: comment.userLiked ? comment.likesCount - 1 : comment.likesCount,
            userDisliked: comment.userDisliked ? !comment.userDisliked : true,
            userLiked: comment.userLiked ? !comment.userLiked : comment.userLiked,
          }
        }
        return comment
      });
    default:
      return state;
  }
}

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
    case types.LIKE_COMMENT:
      return {
        ...state,
        data: commentsData(state.data, action),
      }
    case types.DISLIKE_COMMENT:
      return {
        ...state,
        data: commentsData(state.data, action),
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

const commentsReducer = (state = comments, action) => {
  switch (action.type) {
    default:
      return {
        ...state,
        articleComments: articleComments(state.articleComments, action),
        newComment: newComment(state.newComment, action),
      }
  }
}

export default commentsReducer;
