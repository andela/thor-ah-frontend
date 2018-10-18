/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import * as types from '../actionTypes/updateArticle';

const API = process.env.REACT_APP_API;


// Action types for updating
const editArticle = (isSaving) => ({
  type: types.UPDATE_ARTICLE,
  payload: isSaving,
});

const editArticleSuccess = (editedArticle) => ({
  type: types.UPDATE_ARTICLE_SUCCESS,
  payload: editedArticle,
});

const editArticleError = (error) => ({
  type: types.UPDATE_ARTICLE_ERROR,
  payload: error,
});

// Update article
export const updateArticle = (articleData, slug) => (dispatch) => {
  dispatch(editArticle(true));
  const { token } = localStorage;
  return axios.put(
    `${API}/api/articles/${slug}`, articleData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      if (response.data.status === "success") {
        return dispatch(editArticleSuccess(response.data.article));
      }
      return dispatch(editArticleError(response.data.error));
    })
    .catch((error) => dispatch(editArticleError(error)));
};


// Publish draft
export const publishDraft = (articleData, slug) => (dispatch) => {
  dispatch(editArticle(true));
  const { token } = localStorage;
  return axios.put(
    `${API}/api/articles/drafts/${slug}/publish`, articleData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      if (response.data.status === "success") {
        return dispatch(editArticleSuccess(response.data.article));
      }
      return dispatch(editArticleError(response.data.error));
    })
    .catch((error) => dispatch(editArticleError(error)));
};
