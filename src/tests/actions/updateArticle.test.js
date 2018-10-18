import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


import * as types from '../../actionTypes/updateArticle';
import { updateArticle, publishDraft } from '../../actions/updateArticle';

const API = process.env.REACT_APP_API;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockAxios = new MockAdapter(axios);

describe('article update actions', () => {

  describe('Update an article', () => {
    it('Updates the content of an article', () => {
      mockAxios.onPut(`${API}/api/articles/my-article`)
        .reply(200, {
          status: "success",
          article: {
            description: "This is will be updated as soon as possible.",
            body: "This is will be updated as soon as possible. Just stay tuned man",
          }
        });

        const updates = {
          description: "This is will be updated as soon as possible.",
          body: "This is will be updated as soon as possible. Just stay tuned man",
        }

        const expectedActions = [
          {
            type: types.UPDATE_ARTICLE,
            payload: true
          },
          {
            type: types.UPDATE_ARTICLE_SUCCESS,
            payload: {
                description: "This is will be updated as soon as possible.",
                body: "This is will be updated as soon as possible. Just stay tuned man",
            },
          }
        ]

      const store = mockStore({articleUpdate: []});
      return store.dispatch(updateArticle(updates, 'my-article'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    })
  });

  describe('Publish draft', () => {
    it('Publish article saved to draft', () => {
      mockAxios.onPut(`${API}/api/articles/drafts/my-article/publish`)
        .reply(200, {
          status: "success",
          article: {
            description: "This is will be updated as soon as possible.",
            body: "This is will be updated as soon as possible. Just stay tuned man",
            published: true
          }
        });

        const updates = {
          description: "This is will be updated as soon as possible.",
          body: "This is will be updated as soon as possible. Just stay tuned man",
          published: true
        }

        const expectedActions = [
          {
            type: types.UPDATE_ARTICLE,
            payload: true
          },
          {
            type: types.UPDATE_ARTICLE_SUCCESS,
            payload: {
              description: "This is will be updated as soon as possible.",
              body: "This is will be updated as soon as possible. Just stay tuned man",
              published: true
            },
          }
        ]

      const store = mockStore({articleUpdate: []});
      return store.dispatch(publishDraft(updates, 'my-article'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    })
  });
});
