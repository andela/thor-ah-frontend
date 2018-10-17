import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { addFavorite, deleteFavorite } from "../../actions/favorite";
import {
  FAVORITE_ERROR,
  FAVORITE_LOADING,
  FAVORITE_SUCCESS
} from "../../actionTypes/favorite";

const API = process.env.REACT_APP_API;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const moxios = new MockAdapter(axios);

describe("favourite article actions", () => {
  afterEach(() => {
    moxios.reset();
  });

  describe("addFavorite", () => {
    it("dispatches FAVORITE_SUCCESS after adding article to favorites", () => {
      moxios.onPost(`${API}/api/article/3/favorite`).reply(200, {
        message: 'article added to favorite'
      });
      const expectedActions = [
        { type: FAVORITE_LOADING, payload: true },
        { type: FAVORITE_LOADING, payload: false },
        {
          type: FAVORITE_SUCCESS,
          payload: 'article added to favorite'
        }
      ];
      const store = mockStore({ favorite: {} });
      return store.dispatch(addFavorite(3)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

  });


  describe("deleteFavorite", () => {
    it("dispatches FAVORITE_SUCCESS after adding article to favorites", () => {
      moxios.onDelete(`${API}/api/article/3/favorite`).reply(200, {
        message: 'article deleted from favorite'
      });
      const expectedActions = [
        { type: FAVORITE_LOADING, payload: true },
        { type: FAVORITE_LOADING, payload: false },
        {
          type: FAVORITE_SUCCESS,
          payload: 'article deleted from favorite'
        }
      ];
      const store = mockStore({ favorite: {} });
      return store.dispatch(deleteFavorite(3)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

  });

});
