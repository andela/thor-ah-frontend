import axios from 'axios';

import {
  FETCH_PUBLISHED_ARTICLES_REQUEST,
  FETCH_PUBLISHED_ARTICLES_SUCCESS,
  FETCH_PUBLISHED_ARTICLES_FAILED,
} from '../actionTypes/publishedArticles';

const API = process.env.REACT_APP_API;
const { token } = window.localStorage;

export const fetchPublishedFailed = error => ({
  type: FETCH_PUBLISHED_ARTICLES_FAILED,
  payload: error,
});

export const fetchPublishedSuccess = data => ({
  type: FETCH_PUBLISHED_ARTICLES_SUCCESS,
  payload: data,
});

export const fetchPublishedRequest = state => ({
  type: FETCH_PUBLISHED_ARTICLES_REQUEST,
  payload: state,
});

export const fetchPublishedArticles = () => dispatch => {
  dispatch(fetchPublishedRequest(true));
  axios
    .get(`${API}/api/articles/published`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json'
      }
    })
    .then(response => {
      const { status, drafts } = response.data;
      if (status !== 'success') {
        dispatch(fetchPublishedFailed(response.data.error.message));
        return dispatch(fetchPublishedRequest(false));
      }
      dispatch(fetchPublishedSuccess(drafts))
      return dispatch(fetchPublishedRequest(false));
    })
    .catch(() => {
      dispatch(fetchPublishedFailed('Unexpected error occurred. Refresh the page to retry.'));
      dispatch(fetchPublishedRequest(false));
    })
}
