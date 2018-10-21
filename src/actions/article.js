import axios from "axios";

import {
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_ERROR,
  FETCH_ARTICLE_LOADING,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_LOADING,
  FETCH_ARTICLES_ERROR,
  FETCH_FEATURED_LOADING,
  FETCH_FEATURED_SUCCESS,
  FETCH_FEATURED_ERROR,
  FETCH_RECOMMENDED_LOADING,
  FETCH_RECOMMENDED_SUCCESS,
  FETCH_RECOMMENDED_ERROR,
} from "../actionTypes/article";

const API = process.env.REACT_APP_API;

const fetchArticleSuccess = payload => ({
  type: FETCH_ARTICLE_SUCCESS,
  payload
});

const fetchArticleLoading = payload => ({
  type: FETCH_ARTICLE_LOADING,
  payload
});

const fetchArticleError = payload => ({
  type: FETCH_ARTICLE_ERROR,
  payload
});

const fetchFeaturedSuccess = article => ({
  type: FETCH_FEATURED_SUCCESS,
  payload: article,
});

const fetchFeaturedLoading = state => ({
  type: FETCH_FEATURED_LOADING,
  payload: state,
});

const fetchFeaturedError = error => ({
  type: FETCH_FEATURED_ERROR,
  payload: error,
});


// Get one article
export const getArticle = (articleSlug) => (dispatch) => {
  dispatch(fetchArticleLoading(true));
  const { token } = localStorage;
  return axios
    .get(`${API}/api/articles/${articleSlug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      dispatch(fetchArticleLoading(false));
      dispatch(fetchArticleSuccess(response.data.article));
    })
    .catch(error => {
      dispatch(fetchArticleLoading(false));
      if (error.response) {
        return dispatch(fetchArticleError(error.response.data));
      }
      return dispatch(
        fetchArticleError({
          error: { message: "Server unreachable at the moment" }
        })
      );
    });
};


// Get all articles

const fetchAllArticleSuccess = payload => ({
  type: FETCH_ARTICLES_SUCCESS,
  payload
});

const fetchAllArticleLoading = payload => ({
  type: FETCH_ARTICLES_LOADING,
  payload
});

const fetchAllArticleError = payload => ({
  type: FETCH_ARTICLES_ERROR,
  payload
});

// Get all recommendedArticles

const fetchRecommendedSuccess = payload => ({
  type: FETCH_RECOMMENDED_SUCCESS,
  payload
});

const fetchRecommendedLoading = payload => ({
  type: FETCH_RECOMMENDED_LOADING,
  payload
});

const fetchRecommendedError = payload => ({
  type: FETCH_RECOMMENDED_ERROR,
  payload
});

/**
 * @description Request to the API to get all articles
 *
 * @param  {Number} page the page number passed in
 *
 * @return {object} dispatch object
 */
export const getAllArticle = (page) => (dispatch) => {
  dispatch(fetchAllArticleLoading(true));
  return axios
    .get(`${API}/api/articles?page=${page}`)
    .then(response => {
      if (response.data.status === 'success') {
        dispatch(fetchAllArticleLoading(false));
        return dispatch(fetchAllArticleSuccess(response.data));
      }
      return dispatch(fetchAllArticleError(response));
    })
    .catch((error) => dispatch(fetchAllArticleError(error)));
};


export const getRecommended = (page) => (dispatch) => {
  dispatch(fetchRecommendedLoading(true));
  return axios
    .get(`${API}/api/articles?page=${page}`)
    .then(response => {
      if (response.data.status === 'success') {
        dispatch(fetchRecommendedLoading(false));
        return dispatch(fetchRecommendedSuccess(response.data));
      }
      dispatch(fetchRecommendedError(response));
      return dispatch(fetchRecommendedLoading(false));
    })
    .catch((error) => dispatch(fetchRecommendedError(error)));
};


export const getFeaturedArticles = () => dispatch => {
  dispatch(fetchFeaturedLoading(true));
  return axios
    .get(`${API}/api/articles`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      if (response.data.status === 'success') {
        dispatch(fetchFeaturedLoading(false));
        return dispatch(fetchFeaturedSuccess(response.data))
      }
      dispatch(fetchFeaturedError(response.data.error.message));
      return dispatch(fetchFeaturedLoading(false));
    })
    .catch(error => {
      dispatch(fetchFeaturedError(error));
      dispatch(fetchFeaturedLoading(false));
    });
}
