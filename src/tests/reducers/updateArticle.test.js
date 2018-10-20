import updateArticleReducer from '../../reducers/updateArticle';
import * as types from '../../actionTypes/updateArticle';

describe('Drafts reducer', () => {
  it('should return initial state', () => {
    expect(updateArticleReducer(undefined, {})).toEqual({
      data: {},
      loading: false,
      error: ""
    });
  });

  it('should handle UPDATE_ARTICLE', () => {
    const action = {
      type: types.UPDATE_ARTICLE,
      payload: true
    };
    expect(updateArticleReducer({}, action)).toEqual({
      loading: action.payload,
    });
  });

  it('should handle UPDATE_ARTICLE_SUCCESS', () => {
    const action = {
      type: types.UPDATE_ARTICLE_SUCCESS,
      payload: {
        title: "Draft One",
        body: "This is just a draft that does not really make sense. It will be updated later",
      }
    };
    expect(updateArticleReducer({}, action)).toEqual({
      loading: false,
      error: "",
      data: action.payload
    });
  });

  it('should handle UPDATE_ARTICLE_ERROR', () => {
    const action = {
      type: types.UPDATE_ARTICLE_ERROR,
      payload: 'error occurred'
    };
    expect(updateArticleReducer({}, action)).toEqual({
      loading: false,
      error: action.payload,
    });
  });
});
