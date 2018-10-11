import comments from '../../reducers/comments';
import * as types from '../../actionTypes/comments';

describe('comments reducer', () => {
  it('should return initial state', () => {
    expect(comments(undefined, {})).toEqual({
      fetchingArticleComments: false,
      fetchingCommentsError: '',
      currentArticleComments: [],
      postingNewComment: false,
      newCommentError: ''
    });
  });

  it('should handle CREATE_COMMENT_REQUEST', () => {
    const action = {
      type: types.CREATE_COMMENT_REQUEST,
      payload: true
    };
    expect(comments({}, action)).toEqual({
      postingNewComment: action.payload,
    });
  });

  it('should handle CREATE_COMMENT_SUCCESS', () => {
    const action = {
      type: types.CREATE_COMMENT_SUCCESS,
      payload: {id: 1, body: 'commentOne'}
    };
    expect(comments({currentArticleComments: []}, action)).toEqual({
      currentArticleComments: [action.payload],
    });
  });

  it('should handle CREATE_COMMENT_FAILED', () => {
    const action = {
      type: types.CREATE_COMMENT_FAILED,
      payload: 'some errors'
    };
    expect(comments({}, action)).toEqual({
      commentError: action.payload,
    });
  });

  it('should handle FETCH_ARTICLE_COMMENTS_LOADING', () => {
    const action = {
      type: types.FETCH_ARTICLE_COMMENTS_LOADING,
      payload: true
    };
    expect(comments({}, action)).toEqual({
      fetchingArticleComments: action.payload,
    });
  });

  it('should handle FETCH_ARTICLE_COMMENTS_SUCCESS', () => {
    const action = {
      type: types.FETCH_ARTICLE_COMMENTS_SUCCESS,
      payload: [{id: 1, comment: 'the comment'}]
    };
    expect(comments({}, action)).toEqual({
      currentArticleComments: action.payload,
    });
  });

  it('should handle FETCH_ARTICLE_COMMENTS_FAILURE', () => {
    const action = {
      type: types.FETCH_ARTICLE_COMMENTS_FAILURE,
      payload: 'some error'
    };
    expect(comments({}, action)).toEqual({
      fetchingCommentsError: action.payload,
    });
  });

});
