import axios from 'axios';
import * as types from '../actionTypes/comments';

const API = process.env.REACT_APP_API;

const createCommentRequest = (isPosting) => ({
  type: types.CREATE_COMMENT_REQUEST,
  payload: isPosting,
});

const createCommentSuccess = (newComment) => ({
  type: types.CREATE_COMMENT_SUCCESS,
  payload: newComment,
});

const createCommentError = (error) => ({
  type: types.CREATE_COMMENT_FAILED,
  payload: error,
});

const createComment = (commentData, articleSlug) => (dispatch) => {
  dispatch(createCommentRequest(true));
  const { token } = localStorage;
  return axios.post(
    `${API}/api/articles/${articleSlug}/comments`,
    {
      comment: commentData
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  )
    .then((response) => {
      dispatch(createCommentRequest(false));
      dispatch(createCommentSuccess(response.data.comment));
    })
    .catch((error) => {
      dispatch(createCommentRequest(false));
      dispatch(createCommentError(error));
    });
};

const getArticleCommentsLoading = (isFetching) => ({
  type: types.FETCH_ARTICLE_COMMENTS_LOADING,
  payload: isFetching,
});

const getArticleCommentsSuccess = (comments) => ({
  type: types.FETCH_ARTICLE_COMMENTS_SUCCESS,
  payload: comments,
});

const getArticleCommentsError = (error) => ({
  type: types.FETCH_ARTICLE_COMMENTS_FAILURE,
  payload: error,
});

export const getArticleComments = (articleSlug) => (dispatch) => {
  dispatch(getArticleCommentsLoading(true));
  const { token } = localStorage;
  return axios.get(
    `${API}/api/articles/${articleSlug}/comments`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  )
    .then((response) => {
      dispatch(getArticleCommentsLoading(false));
      const comments = [...response.data.comments]
      comments.sort((firstComment, nextComment) => (
        nextComment.id - firstComment.id
      ));
      dispatch(getArticleCommentsSuccess(comments));
    })
    .catch((error) => {
      dispatch(getArticleCommentsLoading(false));
      dispatch(getArticleCommentsError(error));
    });
};

export default createComment;
