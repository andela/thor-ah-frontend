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
  // make ajax request to create comment here
  const { token } = localStorage;
  axios.post(
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
      console.log(response);
    })
    .catch((error) => console.log(error));
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
      dispatch(getArticleCommentsSuccess(response.data.comments))
    })
    .catch((error) => {
      dispatch(getArticleCommentsLoading(false));
      dispatch(getArticleCommentsError(error));
    });
};

export default createComment;
