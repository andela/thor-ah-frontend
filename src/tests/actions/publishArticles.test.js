import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchPublishedArticles } from '../../actions/publishedArticles'
import * as types from '../../actionTypes/publishedArticles';

const API = process.env.REACT_APP_API;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockAxios = new MockAdapter(axios);

describe('published articles', () => {
  it('get all published articles by a user', () => {
    mockAxios.onGet(`${API}/api/articles/published`)
      .reply(200, {
        status: 'success',
        drafts: [
          {
            authorId: 1,
            body: "Business Operations Element: Business operations",
            createdAt: "2018-10-16T18:54:08.625Z",
            description: "What is Business Operations",
            displayStatus: true,
            id: 8,
            published: true,
            slug: "What-is-Business519060",
            timeToRead: 2,
            title: "What is Business",
            updatedAt: "2018-10-16T18:54:08.625Z",
          }
        ]
      });
    
    const expectedActions = [
      {
        type: types.FETCH_PUBLISHED_ARTICLES_REQUEST,
        payload: true,
      },
      {
        type: types.FETCH_PUBLISHED_ARTICLES_SUCCESS,
        payload: [
          {
            authorId: 1,
            body: "Business Operations Element: Business operations",
            createdAt: "2018-10-16T18:54:08.625Z",
            description: "What is Business Operations",
            displayStatus: true,
            id: 8,
            published: true,
            slug: "What-is-Business519060",
            timeToRead: 2,
            title: "What is Business",
            updatedAt: "2018-10-16T18:54:08.625Z",
          }
        ]
      },
      {
        type: types.FETCH_PUBLISHED_ARTICLES_REQUEST,
        payload: false,
      },
    ]

    const store = mockStore({ publishedArticles: [] });
    return store.dispatch(fetchPublishedArticles())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
  })
})
