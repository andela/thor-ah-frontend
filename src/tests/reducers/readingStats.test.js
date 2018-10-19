import readingStats from '../../reducers/readingStats';
import * as types from "../../actionTypes/readingStats";

describe('Reading Statistics', () =>  {
  it('should return initial state of readingStats', () => {
    expect(readingStats(undefined, {})).toEqual({
      loading: false,
      error: '',
      stats: {
        mostReadCategory: 'None',
        numberOfArticlesRead: 0,
        articleReactions: {
          liked: 0,
          disliked: 0
        },
      }
    })
  });

  it('should handle FETCH_READING_STATS_REQUEST', () => {
    const action = {
      type: types.FETCH_READING_STATS_REQUEST,
      payload: true,
    };
    expect(readingStats({}, action)).toEqual({
      loading: true,
    })
  });

  it('should handle FETCH_READING_STATS_FAILED', () => {
    const action = {
      type: types.FETCH_READING_STATS_FAILED,
      payload: 'Error occurred',
    };
    expect(readingStats({}, action)).toEqual({
      error: 'Error occurred',
    })
  });

  it('should handle FETCH_READING_STATS_SUCCESS', () => {
    const action = {
      type: types.FETCH_READING_STATS_SUCCESS,
      payload: {
        mostReadCategory: 'Technology',
        numberOfArticlesRead: 1,
        articleReactions: {
          liked: 1,
          disliked: 1
        },
      },
    };
    expect(readingStats({}, action)).toEqual({
      stats: {
        mostReadCategory: 'Technology',
        numberOfArticlesRead: 1,
        articleReactions: {
          liked: 1,
          disliked: 1
        },
      }
    })
  });

  it('should handle FETCH_READING_STATS_REQUEST when loading is false', () => {
    const action = {
      type: types.FETCH_READING_STATS_REQUEST,
      payload: false,
    };
    expect(readingStats({}, action)).toEqual({
      loading: false,
    })
  });
});
