import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getReadingStats } from "../../actions/readingStats";
import * as types from "../../actionTypes/readingStats";


const API = process.env.REACT_APP_API;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockAxios = new MockAdapter(axios);

describe('get reading stats', () => {
  it('should return reading stats', () => {
    mockAxios.onGet(`${API}/api/user-reading-stats`)
      .reply(200, {
        status: 'success',
        mostReadCategory: 'Technology',
        numberOfArticlesRead: 5,
        articleReactions: {
          liked: 1,
          disliked: 1,
        },
      });
    
    const expectedActions = [
        {
          type: types.FETCH_READING_STATS_REQUEST,
          payload: true,
        },
        {
          type: types.FETCH_READING_STATS_SUCCESS,
          payload: {
            mostReadCategory: 'Technology',
            numberOfArticlesRead: 5,
            articleReactions: {
              liked: 1,
              disliked: 1,
            },
          }
        },
        {
          type: types.FETCH_READING_STATS_REQUEST,
          payload: false,
        },
      ]

      const store = mockStore({ readingStats: {} });
      return store.dispatch(getReadingStats())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        })
  })
});
