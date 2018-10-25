import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getAllCategories, fetchCategoryAction } from '../../actions/categories';
import * as types from '../../actionTypes/categories';

const API = process.env.REACT_APP_API;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockAxios = new MockAdapter(axios);

describe('category actions', () => {

  describe('get all categories', () => {
    it('fetches all article categories in the application', () => {
      mockAxios.onGet(`${API}/api/article-categories`)
        .reply(200, {
          status: 'success',
          categories: [
            [{id: 1, name: "Technology"}]
          ]
        });

        const expectedActions = [
          {
            type: types.FETCH_CATEGORIES,
          },
          {
            type: types.FETCH_CATEGORIES_SUCCESS,
            payload: [
              [{"id": 1, "name": "Technology"}],
            ],
          }
        ]

      const store = mockStore({data: []});
      return store.dispatch(getAllCategories())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    })
  });

  describe('get articles for a single category', () => {
    it('fetches all articles on single category', () => {
      mockAxios.onGet(`${API}/api/article-categories/Technology/articles?page=1`)
        .reply(200, {
          status: 'success',
          category: {
            category: [{id: 12, title: "self-driving car"}]
          }
        });

        const expectedActions = [
          {
            type: types.FETCH_CATEGORY_SUCCESS,
            payload: {
              category: {
                category: [{id: 12, title: "self-driving car"}]
              },
              status: 'success',
            },
          }
        ];

      const store = mockStore({data: []});
      return store.dispatch(fetchCategoryAction('Technology', 1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
