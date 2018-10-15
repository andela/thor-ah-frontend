import axios from "axios";

import {
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_ERROR,
  CREATE_ARTICLE_LOADING
} from "../actionTypes/createArticle";

const createArticleSuccess = article => ({
  type: CREATE_ARTICLE_SUCCESS,
  payload: article
});

const createArticleLoading = isLoading => ({
  type: CREATE_ARTICLE_LOADING,
  payload: isLoading
});

const createArticleFailure = error => ({
  type: CREATE_ARTICLE_ERROR,
  payload: error
});

export const createArticle = articleData => dispatch => {
  const { token } = localStorage;

  dispatch(createArticleLoading(true));
  const { REACT_APP_API } = process.env;
  return axios
    .post(`${REACT_APP_API}/api/articles`, articleData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.data.status === "success") {
        dispatch(createArticleLoading(false));
        return dispatch(
          createArticleSuccess(response.data.newArticleAlert.createdArticle)
        );
      }
      return dispatch(createArticleFailure(response.data.error));
    })
    .catch(error => console.log(error, "error from creating article"));
};

export default createArticle;
