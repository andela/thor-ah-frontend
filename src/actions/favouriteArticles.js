import axios from 'axios';

import {
  FETCH_FAVOURITE_ARTICLES_REQUEST,
  FETCH_FAVOURITE_ARTICLES_SUCCESS,
  FETCH_FAVOURITE_ARTICLES_FAILED,
} from '../actionTypes/favouriteArticles';

const API = process.env.REACT_APP_API;
const { token } = window.localStorage;

export const fetchFavouriteFailed = error => ({
  type: FETCH_FAVOURITE_ARTICLES_FAILED,
  payload: error,
});

export const fetchFavouriteSuccess = data => ({
  type: FETCH_FAVOURITE_ARTICLES_SUCCESS,
  payload: data,
});

export const fetchFavouriteRequest = state => ({
  type: FETCH_FAVOURITE_ARTICLES_REQUEST,
  payload: state,
});

export const fetchFavouriteArticles = () => dispatch => {
  dispatch(fetchFavouriteRequest(true));
  axios
    .get(`${API}/api/user/articles/favorite`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json'
      }
    })
    .then(response => {
      const { status, articles } = response.data;
      if (status !== 'success') {
        dispatch(fetchFavouriteFailed(response.data.error.message));
        return dispatch(fetchFavouriteRequest(false));
      }
      dispatch(fetchFavouriteSuccess(articles))
      return dispatch(fetchFavouriteRequest(false));
    })
    .catch(() => {
      dispatch(fetchFavouriteFailed('Unexpected error occurred. Refresh the page to retry.'));
      dispatch(fetchFavouriteRequest(false));
    })
}
