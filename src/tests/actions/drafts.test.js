import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


import * as types from '../../actionTypes/drafts';
import { draftArticle, getDrafts } from '../../actions/drafts';

const API = process.env.REACT_APP_API;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockAxios = new MockAdapter(axios);

describe('draft actions', () => {

  describe('Save to Draft', () => {
    it('Saves an unplublished article to drafts', () => {
      mockAxios.onPost(`${API}/api/articles`)
        .reply(200, {
          status: "success",
          newArticleAlert: {
            createdArticle: {
              title: "Draft One",
              body: "This is just a draft that does not really make sense. It will be updated later",
            }
          }
        });

        const articleData = {
          title: "Draft One",
          body: "This is just a draft that does not really make sense. It will be updated later"
        }

        const expectedActions = [
          {
            type: types.CREATE_DRAFT,
            payload: true
          },
          {
            type: types.CREATE_DRAFT_SUCCESS,
            payload:
              {
                title: "Draft One",
                body: "This is just a draft that does not really make sense. It will be updated later",
              },
          }
        ]

      const store = mockStore({drafts: []});
      return store.dispatch(draftArticle(articleData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    })
  });

  describe('Get all drafts', () => {
    it('Gets all unplublished articles for an author', () => {
      mockAxios.onGet(`${API}/api/articles/drafts`)
        .reply(200, {
          status: "success",
          drafts: {
            rows: [
              [{id: 16,
                title: "this is a title that means nothing",
                slug: "this-is-a-title-that-means-nothing22242",
                description: "Sohvhbjbjm with the title and the description",
              }]
            ]
          }
        });

        const expectedActions = [
          {
            type: types.FETCH_DRAFTS
          },
          {
            type: types.FETCH_DRAFTS_SUCCESS,
            payload: [
              [
                {
                  "id": 16,
                  "title": "this is a title that means nothing",
                  "slug": "this-is-a-title-that-means-nothing22242",
                  "description": "Sohvhbjbjm with the title and the description",
                }
              ]
            ]
          }
        ]

      const store = mockStore({drafts: []});
      return store.dispatch(getDrafts())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    })
  });
});
