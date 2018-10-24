import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchFavouriteArticles } from '../../actions/favouriteArticles'
import * as types from '../../actionTypes/favouriteArticles';

const API = process.env.REACT_APP_API;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockAxios = new MockAdapter(axios);

describe('favourite articles', () => {
  it('get all favourite articles by a user', () => {
    mockAxios.onGet(`${API}/api/user/articles/favorite`)
      .reply(200, {
        status: 'success',
        message: 'Your favorite article',
        pagination: {
          currentPage: 1,
          currentPageSize: 3,
          totalPages: 1,
          totalRecords: 3,
        },
        articles: [
          {
            id: 10,
            Article: {
              author: {
                firstName: "Testing",
                lastName: "Man",
                username: "testingMan"
              },
              body: "The conservation of wildlife is essential to ensure the ecosystem is kept in tact",
              createdAt: "2018-10-16T15:32:12.038Z",
              description: "wildlife",
              slug: "wildlife-conservation",
              timeToRead: 1,
              title: "wildlife conservation",
            }
          }
        ]
      });

    const expectedActions = [
      {
        type: types.FETCH_FAVOURITE_ARTICLES_REQUEST,
        payload: true,
      },
      {
        type: types.FETCH_FAVOURITE_ARTICLES_SUCCESS,
        payload: [
          {
            id: 10,
            Article: {
              author: {
                firstName: "Testing",
                lastName: "Man",
                username: "testingMan"
              },
              body: "The conservation of wildlife is essential to ensure the ecosystem is kept in tact",
              createdAt: "2018-10-16T15:32:12.038Z",
              description: "wildlife",
              slug: "wildlife-conservation",
              timeToRead: 1,
              title: "wildlife conservation",
            }
          }
        ]
      },
      {
        type: types.FETCH_FAVOURITE_ARTICLES_REQUEST,
        payload: false,
      },
    ]

    const store = mockStore({ publishedArticles: [] });
    return store.dispatch(fetchFavouriteArticles())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
  })
})
