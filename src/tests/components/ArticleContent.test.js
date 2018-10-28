import React from "react";
import { mount } from "enzyme";
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ArticleContent from "../../components/ArticleContent/ArticleContent";
import initialState from '../../store/initialState';

const token = jwt.sign({ id: 1}, 'secret', { expiresIn: '24h'});

localStorage.setItem('token', token);

const state = {
  ...initialState,
  oneArticleReducer: {
    article: {
      author: {
        id: 1,
        username: 'some name',
      },
      tags: [{ tag: 'some tag'}]
    },
    reactions: ''
  },
  favorite: {
    message: 'some message'
  }
}

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(state);

describe("ArticleContent Component", () => {
  test("renders the ArticleContent Component", () => {
    const wrapper =  mount(
      <Provider store={store}>
        <ArticleContent />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
