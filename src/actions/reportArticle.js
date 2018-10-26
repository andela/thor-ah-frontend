import axios from "axios";
import * as types from "../actionTypes/reportArticle";

const reportArticleSucess = reportResponse => ({
  type: types.REPORT_ARTICLE_SUCCESS,
  payload: reportResponse
});

const reportArticleError = error => ({
  type: types.REPORT_ARTICLE_ERROR,
  payload: error
});

const reportArticleLoading = loading => ({
  type: types.REPORT_ARTICLE_LOADING,
  payload: loading
});

const reportArticle = (
  reasonForReport,
  reportBody,
  articleslug
) => dispatch => {
  const { token } = localStorage;

  dispatch(reportArticleLoading(true));
  const { REACT_APP_API } = process.env;
  return axios
    .post(
      `${REACT_APP_API}/api/articles/${articleslug}/report`,
      { reasonForReport, reportBody },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      if (response.data.status === "success") {
        dispatch(reportArticleLoading(false));
        return dispatch(reportArticleSucess(response.data));
      }
      dispatch(reportArticleLoading(false));
      return dispatch(reportArticleError(response));
    })
    .catch(error => {
      dispatch(reportArticleLoading(false));
      if (error.response) {
        dispatch(reportArticleError(error.response.data));
      }
      dispatch(reportArticleError({ error }));
      return error;
    });
};

export default reportArticle;
