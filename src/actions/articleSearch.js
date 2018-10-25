import axios from "axios";

import * as types from "../actionTypes/articleSearch";
import arrayFilter from '../utils/arrayFilter';

const { REACT_APP_API } = process.env;

const articleSearchSuccess = articles => ({
  type: types.ARTICLE_SEARCH_SUCCESS,
  payload: articles
});

const articleSearchError = error => ({
  type: types.ARTICLE_SEARCH_ERROR,
  payload: error
});

const articleSearchLoading = loading => ({
  type: types.ARTICLE_SEARCH_LOADING,
  payload: loading
});

const articleSearch = (filter = 'keywords', searchValue) => dispatch => {
  const { token } = localStorage;
  dispatch(articleSearchLoading(true));

  return axios
    .get(`${REACT_APP_API}/api/articles/search?${filter}=${searchValue}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Types": "application/json"
      }
    })
    .then(response => {
      if (response && response.data.status === "success") {
        dispatch(articleSearchLoading(false));
        dispatch(articleSearchSuccess(arrayFilter(response.data.articles)));
        if (response.data.articles.length === 0) {
          return dispatch(articleSearchSuccess(`No results found for ${searchValue}. Please try again.`));
        }
        return response.data;
      }
      dispatch(articleSearchLoading(false));
      return dispatch(articleSearchError(response.error));
    })
    .catch(error => {
      dispatch(articleSearchLoading(false));
      dispatch(articleSearchError(`No results found for ${searchValue}. Please try again.`));
      return error;
    });
};

export default articleSearch;
