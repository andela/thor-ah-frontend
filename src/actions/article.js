import axios from "axios";

import {
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_ERROR,
  FETCH_ARTICLE_LOADING,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_LOADING,
  FETCH_ARTICLES_ERROR
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

// Get all articles
export const getAllArticle = () => (dispatch) => {
  dispatch(fetchAllArticleLoading(true));
  return axios
    .get(`${API}/api/articles`)
    .then(response => {
      if (response.data.status === 'success') {
        dispatch(fetchAllArticleLoading(false))
        return dispatch(fetchAllArticleSuccess(response.data.articles));
      }
      return dispatch(fetchAllArticleError(response));
    })
    .catch((error) => dispatch(fetchAllArticleError(error)));
};
