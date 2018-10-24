/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import * as types from '../actionTypes/drafts';

const API = process.env.REACT_APP_API;


// Action types for saving articles as drafts
const createDraft = (isSaving) => ({
  type: types.CREATE_DRAFT,
  payload: isSaving,
});

const createDraftSuccess = (newDraft) => ({
  type: types.CREATE_DRAFT_SUCCESS,
  payload: newDraft,
});

const createDraftError = (error) => ({
  type: types.CREATE_DRAFT_ERROR,
  payload: error,
});

// Draft action
export const draftArticle = (articleData) => (dispatch) => {
  dispatch(createDraft(true));
  const { token } = localStorage;
  return axios.post(
    `${API}/api/articles`, articleData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      if (response.data.status === "success") {
        return dispatch(createDraftSuccess(response.data.newArticleAlert.createdArticle));
      }
      return dispatch(createDraftError(response.data.error));
    })
    .catch((error) => dispatch(createDraftError(error)));
};


// Action types for fetching author's drafts
const fetchDrafts = () => ({
  type: types.FETCH_DRAFTS,
});

const fetchDraftsSuccess = (payload) => ({
  type: types.FETCH_DRAFTS_SUCCESS,
  payload,
});

const fetchDraftsError = (error) => ({
  type: types.FETCH_DRAFTS_ERROR,
  payload: error,
});

// Get every draft for a logged in author
export const getDrafts = () => dispatch => {
  dispatch(fetchDrafts());
  const { token } = localStorage;
  return axios
    .get(`${API}/api/articles/drafts`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    )
    .then(response => {
      if (response.data.status === 'success') {
        return dispatch(fetchDraftsSuccess(response.data.drafts.rows));
      }
      return dispatch(fetchDraftsError());
    })
    .catch(() => dispatch(fetchDraftsError()));
};
