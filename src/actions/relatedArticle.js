import axios from "axios";
import {
  FETCH_RELATED_ARTICLE_SUCCESS,
  FETCH_RELATED_ARTICLE_LOADING,
  FETCH_RELATED_ARTICLE_ERROR
} from "../actionTypes/relatedArticle";

const API = process.env.REACT_APP_API;

const fetchRelatedArticleSuccess = payload => ({
  type: FETCH_RELATED_ARTICLE_SUCCESS,
  payload
});

const fetchRelatedArticleLoading = payload => ({
  type: FETCH_RELATED_ARTICLE_LOADING,
  payload
});

const fetchRelatedArticleError = payload => ({
  type: FETCH_RELATED_ARTICLE_ERROR,
  payload
});

const getRelatedArticle = tag => dispatch => {
  dispatch(fetchRelatedArticleLoading(true));
  const { token } = localStorage;
  return axios
    .get(`${API}/api/articles/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      params: { tag }
    })
    .then(response => {
      const article = response.data.articles;
      dispatch(fetchRelatedArticleLoading(false));
      dispatch(fetchRelatedArticleSuccess(article[0].articles));
    })
    .catch(error => {
      dispatch(fetchRelatedArticleLoading(false));
      if (error.response) {
        return dispatch(fetchRelatedArticleError(error.response.data));
      }
      return dispatch(
        fetchRelatedArticleError({
          error: { message: "Server unavailable at the moment" }
        })
      );
    });
};

export default getRelatedArticle;
