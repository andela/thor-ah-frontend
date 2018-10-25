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

export const fetchFavouriteSuccess = payload => ({
  type: FETCH_FAVOURITE_ARTICLES_SUCCESS,
  payload
});

export const fetchFavouriteRequest = state => ({
  type: FETCH_FAVOURITE_ARTICLES_REQUEST,
  payload: state,
});

export const fetchFavouriteArticles = (page) => dispatch =>
  axios
    .get(`${API}/api/user/articles/favorite?page=${page}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json'
      }
    })
    .then(response => {
      if (response.data.status !== 'success') {
        dispatch(fetchFavouriteFailed(response.data.error.message));
        return dispatch(fetchFavouriteRequest(false));
      }
      dispatch(fetchFavouriteSuccess(response.data))
      return dispatch(fetchFavouriteRequest(false));
    })
    .catch((err) => {
      console.log(err)
      dispatch(fetchFavouriteFailed('Unexpected error occurred. Refresh the page to retry.'));
      dispatch(fetchFavouriteRequest(false));
    })
