import axios from 'axios';

import { CREATE_ARTICLE_SUCCESS, CREATE_ARTICLE_FAILURE, CREATE_ARTICLE_LOADING } from './action.types';


const setArticleSuccess = (article) => ({
  type: CREATE_ARTICLE_SUCCESS,
  payload: article
})

const setArticleLoading = (isLoading) => ({
  type: CREATE_ARTICLE_LOADING,
  payload: isLoading
})

const setArticleFailure = (error) => ({
  type: CREATE_ARTICLE_FAILURE,
  payload: error
})

// Create Article
export const createArticle = (articleData, history) => dispatch => {
  dispatch(setArticleLoading(true));
  axios.post('api', articleData)
  .then((response) => {
    if (response.data.status === 'success') {
      history.push('/articles/slug');
      dispatch(setArticleLoading(false));
      return dispatch(setArticleSuccess(response.data.newArticle));
    }
    return dispatch(setArticleFailure(response.data.error));
  })
  .catch((error) =>console.log(error));
}
