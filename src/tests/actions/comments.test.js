import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import createComment, {
  getArticleComments,
  likeComment,
  dislikeComment,
} from '../../actions/comments';
import * as types from '../../actionTypes/comments';

const API = process.env.REACT_APP_API;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const moxios = new MockAdapter(axios);

describe('comment actions', () => {
  afterEach(() => {
    moxios.reset();
  });

  describe('getArticleComments', () => {
    it('dispatches FETCH_ARTICLE_COMMENTS_SUCCESS after fetching comments', () => {
      moxios.onGet(`${API}/api/articles/some-slug/comments`)
        .reply(200, {
          comments: [
            {id: 1, body: 'The body'}
          ]
        });

      const expectedActions = [
        {
          type: types.FETCH_ARTICLE_COMMENTS_LOADING,
          payload: true
        },
        {
          type: types.FETCH_ARTICLE_COMMENTS_LOADING,
          payload: false
        },
        {
          type: types.FETCH_ARTICLE_COMMENTS_SUCCESS,
          payload: [
            {id: 1, body: 'The body'}
          ]
        }
      ]

      const store = mockStore({comments: {}});
      return store.dispatch(getArticleComments('some-slug'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('dispatches FETCH_ARTICLE_COMMENTS_ERROR', () => {
      moxios.onGet(`${API}/api/articles/some-slug/comments`)
        .networkError('Server error');

      const store = mockStore({comments: {}});
      return store.dispatch(getArticleComments('some-slug'))
        .then(() => {
          const receivedActions = store.getActions();
          const failureAction = receivedActions.find(
            action => action.type === types.FETCH_ARTICLE_COMMENTS_FAILURE
          );
          expect(failureAction).toBeTruthy();
        });
    });
  });

  describe('createComment', () => {
    it('dispatches FETCH_ARTICLE_COMMENTS_SUCCESS after fetching comments', () => {
      moxios.onPost(`${API}/api/articles/some-slug/comments`)
        .reply(201, {
          comment: {
            id: 1,
            body: 'The body',
            article: {
              id: 2,
              slug: 'some-slug'
            }
          }
        });

      const expectedActions = [
        {
          type: "CREATE_COMMENT_REQUEST",
          payload: true,
        },
        {
          type: "CREATE_COMMENT_REQUEST",
          payload: false,
        },
        {
          type: "CREATE_COMMENT_SUCCESS",
          payload: {
            article: {
              id: 2,
              slug: "some-slug"
            },
            body: "The body",
            id: 1
          },
        },
        {
          type: "FETCH_ARTICLE_COMMENTS_LOADING",
          payload: true,
        },
        {
          type: "FETCH_ARTICLE_COMMENTS_LOADING",
          payload: false,
        }
      ]

      const store = mockStore({comments: {}});
      return store.dispatch(createComment('the comment', 'some-slug'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });


    it('dispatches FETCH_ARTICLE_COMMENTS_ERROR', () => {
      moxios.onPost(`${API}/api/articles/some-slug/comments`)
        .networkError('Server error');

      const store = mockStore({comments: {}});
      return store.dispatch(createComment('some comment', 'some-slug'))
        .then(() => {
          const receivedActions = store.getActions();
          const failureAction = receivedActions.find(
            action => action.type === types.CREATE_COMMENT_FAILED
          );
          expect(failureAction).toBeTruthy();
        });
    });
  });

  describe('likeComment', () => {
    it('dispatches LIKE_COMMENT', () => {
      moxios.onPost(`${API}/api/articles/some-slug/comments/3/like`)
        .reply(200, {
          comment: {
          }
        });

      const expectedActions = [
        {
          type: types.LIKE_COMMENT,
          key: 0
        }
      ];

      const store = mockStore({});
      return store.dispatch(likeComment(0, 3, 'some-slug'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('dislikeComment', () => {
    it('dispatches LIKE_COMMENT', () => {
      moxios.onPost(`${API}/api/articles/some-slug/comments/3/dislike`)
        .reply(200, {
          comment: {
          }
        });

      const expectedActions = [
        {
          type: types.DISLIKE_COMMENT,
          key: 0
        }
      ];

      const store = mockStore({});
      return store.dispatch(dislikeComment(0, 3, 'some-slug'))
        .then(() => {
          console.log(store.getActions());
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});
