import axios from "axios";
import * as types from "../actionTypes/article";

const API = process.env.REACT_APP_API;

const fetchArticleSuccess = payload => ({
  type: types.FETCH_ARTICLE_SUCCESS,
  payload
});

const fetchArticleLoading = payload => ({
  type: types.FETCH_ARTICLE_LOADING,
  payload
});

const fetchArticleError = payload => ({
  type: types.FETCH_ARTICLE_ERROR,
  payload
});

const likeDislike = payload => ({
  type: types.LIKE_DISLIKE_ARTICLE,
  payload
});

const reactionCount = payload => ({
  type: types.FETCH_REACTION_COUNT,
  payload
});

const fetchFeaturedSuccess = article => ({
  type: types.FETCH_FEATURED_SUCCESS,
  payload: article,
});

const fetchFeaturedLoading = state => ({
  type: types.FETCH_FEATURED_LOADING,
  payload: state,
});

const fetchFeaturedError = error => ({
  type: types.FETCH_FEATURED_ERROR,
  payload: error,
});


export const articleReactionCount = articleId => dispatch => {
  const { token } = localStorage;
  return axios
    .get(`${API}/api/articles/${articleId}/reactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      dispatch(reactionCount(response.data.reactions));
    });
};

export const articleReaction = (articleId, reactionType) => dispatch => {
  dispatch(likeDislike(reactionType));
  const { token } = localStorage;
  return axios
    .post(
      `${API}/api/articles/${articleId}/reactions`,
      { reaction: reactionType },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      dispatch(likeDislike(response.data));
      dispatch(articleReactionCount(articleId));
    });
};

//  Get a single article

export const getArticle = articleSlug => dispatch => {
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
  type: types.FETCH_ARTICLES_SUCCESS,
  payload
});

const fetchAllArticleLoading = payload => ({
  type: types.FETCH_ARTICLES_LOADING,
  payload
});

const fetchAllArticleError = payload => ({
  type: types.FETCH_ARTICLES_ERROR,
  payload
});

// Get all recommendedArticles

const fetchRecommendedSuccess = payload => ({
  type: types.FETCH_RECOMMENDED_SUCCESS,
  payload
});

const fetchRecommendedLoading = payload => ({
  type: types.FETCH_RECOMMENDED_LOADING,
  payload
});

const fetchRecommendedError = payload => ({
  type: types.FETCH_RECOMMENDED_ERROR,
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
    .catch(error => dispatch(fetchAllArticleError(error)));
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
