import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getArticle, getAllArticle, getRecommended, getFeaturedArticles } from "../../actions/article";
import * as types from "../../actionTypes/article";

const API = process.env.REACT_APP_API;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const moxios = new MockAdapter(axios);

describe("view article actions", () => {
  afterEach(() => {
    moxios.reset();
  });

  describe("getArticle", () => {
    it("dispatches FETCH_ARTICLE_SUCCESS after fetching articles", () => {
      moxios.onGet(`${API}/api/articles/some-slug`).reply(200, {
        article: {
          id: 3,
          title: "staying fit",
          description: "A short story about a life well lived of Raquel"
        }
      });
      const expectedActions = [
        { type: types.FETCH_ARTICLE_LOADING, payload: true },
        { type: types.FETCH_ARTICLE_LOADING, payload: false },
        {
          type: types.FETCH_ARTICLE_SUCCESS,
          payload: {
            id: 3,
            title: "staying fit",
            description: "A short story about a life well lived of Raquel"
          }
        }
      ];
      const store = mockStore({ article: {} });
      return store.dispatch(getArticle("some-slug")).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
    it("dispatches FETCH_ARTICLE_ERROR", () => {
      moxios.onGet(`${API}/api/articles/`).networkError("server error");
      const store = mockStore({ article: {} });
      return store.dispatch(getArticle("some-slug")).then(() => {
        const recievedActions = store.getActions();
        const failureAction = recievedActions.find(
          action => action.type === types.FETCH_ARTICLE_ERROR
        );
        expect(failureAction).toBeTruthy();
      });
    });
  });

  describe("getAllArticle", () => {
    it("dispatches FETCH_ARTICLES_SUCCESS after fetching articles", () => {
      moxios.onGet(`${API}/api/articles?page=${1}`).reply(200, {
        status: 'success',
        articles: [
          {
            id: 1,
            title: "taying fit",
            description: "A short story about a life well lived of Raquel"
          },
          {
            id: 2,
            title: "stayin fit",
            description: "A short story about a life well lived of Raquel"
          },
          {
            id: 3,
            title: "stayng fit",
            description: "A short story about a life well lived of Raquel"
          },
        ]
      });

      const expectedActions = [
        { type: types.FETCH_ARTICLES_LOADING, payload: true },
        { type: types.FETCH_ARTICLES_LOADING, payload: false },
        {
          type: types.FETCH_ARTICLES_SUCCESS,
          
          payload: {
            status: 'success',
            articles: [
              {
                id: 1,
                title: "taying fit",
                description: "A short story about a life well lived of Raquel"
              },
              {
                id: 2,
                title: "stayin fit",
                description: "A short story about a life well lived of Raquel"
              },
              {
                id: 3,
                title: "stayng fit",
                description: "A short story about a life well lived of Raquel"
              },
            ]
          }
        }
      ];

      const store = mockStore({ data: [] });
      return store.dispatch(getAllArticle(1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });


    it("dispatches FETCH_ARTICLES_ERROR", () => {
      moxios.onGet(`${API}/api/articles?page=1`).networkError("server error");
      const store = mockStore({ data: [] });
      return store.dispatch(getAllArticle()).then(() => {
        const recievedActions = store.getActions();
        const failureAction = recievedActions.find(
          action => action.type === types.FETCH_ARTICLES_ERROR
        );
        expect(failureAction).toBeTruthy();
      });
    });
  });

  describe("getRecommended", () => {
    it("dispatches FETCH_RECOMMENDED_SUCCESS after fetching articles", () => {
      moxios.onGet(`${API}/api/articles?page=${1}`).reply(200, {
        status: 'success',
        articles: [
          {
            id: 1,
            title: "taying fit",
            description: "A short story about a life well lived of Raquel"
          },
          {
            id: 2,
            title: "stayin fit",
            description: "A short story about a life well lived of Raquel"
          },
          {
            id: 3,
            title: "stayng fit",
            description: "A short story about a life well lived of Raquel"
          },
        ]
      });

      const expectedActions = [
        { type: types.FETCH_RECOMMENDED_LOADING, payload: true },
        { type: types.FETCH_RECOMMENDED_LOADING, payload: false },
        {
          type: types.FETCH_RECOMMENDED_SUCCESS,
          
          payload: {
            status: 'success',
            articles: [
              {
                id: 1,
                title: "taying fit",
                description: "A short story about a life well lived of Raquel"
              },
              {
                id: 2,
                title: "stayin fit",
                description: "A short story about a life well lived of Raquel"
              },
              {
                id: 3,
                title: "stayng fit",
                description: "A short story about a life well lived of Raquel"
              },
            ]
          }
        }
      ];

      const store = mockStore({ data: [] });
      return store.dispatch(getRecommended(1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it("dispatches FETCH_RECOMMENDED_ERROR", () => {
      moxios.onGet(`${API}/api/articles?page=1`).networkError("server error");
      const store = mockStore({ data: [] });
      return store.dispatch(getRecommended()).then(() => {
        const recievedActions = store.getActions();
        const failureAction = recievedActions.find(
          action => action.type === types.FETCH_RECOMMENDED_ERROR
        );
        expect(failureAction).toBeTruthy();
      });
    });
  });

  describe("getFeaturedArticles", () => {
    it("dispatches FETCH_FEATURED_SUCCESS after fetching articles", () => {
      moxios.onGet(`${API}/api/articles`).reply(200, {
        status: 'success',
        articles: [
          {
            id: 1,
            title: "taying fit",
            description: "A short story about a life well lived of Raquel"
          },
          {
            id: 2,
            title: "stayin fit",
            description: "A short story about a life well lived of Raquel"
          },
          {
            id: 3,
            title: "stayng fit",
            description: "A short story about a life well lived of Raquel"
          },
        ]
      });

      const expectedActions = [
        { type: types.FETCH_FEATURED_LOADING, payload: true },
        { type: types.FETCH_FEATURED_LOADING, payload: false },
        {
          type: types.FETCH_FEATURED_SUCCESS,
          
          payload: {
            status: 'success',
            articles: [
              {
                id: 1,
                title: "taying fit",
                description: "A short story about a life well lived of Raquel"
              },
              {
                id: 2,
                title: "stayin fit",
                description: "A short story about a life well lived of Raquel"
              },
              {
                id: 3,
                title: "stayng fit",
                description: "A short story about a life well lived of Raquel"
              },
            ]
          }
        }
      ];

      const store = mockStore({ data: [] });
      return store.dispatch(getFeaturedArticles()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it("dispatches FETCH_FEATURED_ERROR", () => {
      moxios.onGet(`${API}/api/articles`).networkError("server error");
      const store = mockStore({ data: [] });
      return store.dispatch(getFeaturedArticles()).then(() => {
        const recievedActions = store.getActions();
        const failureAction = recievedActions.find(
          action => action.type === types.FETCH_FEATURED_ERROR
        );
        expect(failureAction).toBeTruthy();
      });
    });
  });
});
