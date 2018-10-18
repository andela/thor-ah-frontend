import { FETCH_READING_STATS_SUCCESS, FETCH_READING_STATS_REQUEST, FETCH_READING_STATS_FAILED } from '../actionTypes/readingStats';

export const readingStatsRequesting = state => ({
  type: FETCH_READING_STATS_REQUEST,
  payload: state,
})

export const readingStatsError = err => ({
  type: FETCH_READING_STATS_FAILED,
  payload: err,
});

export const showReadingStats = data => ({
  type: FETCH_READING_STATS_SUCCESS,
  payload: data,
});

const API = process.env.REACT_APP_API;

export const getReadingStats = () => dispatch => {
  dispatch(readingStatsRequesting(true));
  const { token } = window.localStorage;
  fetch(`${API}/api/user-reading-stats`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json',
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'error') {
        dispatch(readingStatsError(data.error.message));
        return dispatch(readingStatsRequesting(false));
      }
      const { numberOfArticlesRead, mostReadCategory, articleReactions } = data;
      const payload = {
        mostReadCategory,
        numberOfArticlesRead,
        articleReactions,
      }
      dispatch(showReadingStats(payload))
      return dispatch(readingStatsRequesting(false));
    })
    .catch(() => {
      const errorMessage = "Error occurred.Please try again later";
      dispatch(readingStatsError(errorMessage));
      return dispatch(readingStatsRequesting(false));
    });
};
