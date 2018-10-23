import initalState from '../store/initialState';
import {
  FETCH_READING_STATS_FAILED,
  FETCH_READING_STATS_REQUEST,
  FETCH_READING_STATS_SUCCESS
} from '../actionTypes/readingStats';

const readingStats = (state = initalState.readingStats, action) => {
  switch (action.type) {
    case FETCH_READING_STATS_SUCCESS:
      return {
        ...state,
        stats: { ...state.stats, ...action.payload }
      };
    case FETCH_READING_STATS_REQUEST:
      return {
        ...state,
        loading: action.payload,
      };
    case FETCH_READING_STATS_FAILED:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state;
  }
}

export default readingStats;
