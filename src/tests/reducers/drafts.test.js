import draftsReducer from '../../reducers/drafts';
import * as types from '../../actionTypes/drafts';

describe('Drafts reducer', () => {
  it('should return initial state', () => {
    expect(draftsReducer(undefined, {})).toEqual({
      newDraft: {
        data: {},
        error: "",
        loading: false
      },
      allDrafts: {
        data: [],
        error: "",
        loading: false
      },
    });
  });

  it('should handle CREATE_DRAFT', () => {
    const action = {
      type: types.CREATE_DRAFT,
      payload: true
    };
    expect(draftsReducer({}, action)).toEqual({
      loading: action.payload,
    });
  });

  it('should handle CREATE_DRAFT_SUCCESS', () => {
    const action = {
      type: types.CREATE_DRAFT_SUCCESS,
      payload: {
        title: "Draft One",
        body: "This is just a draft that does not really make sense. It will be updated later",
      }
    };
    expect(draftsReducer({}, action)).toEqual({
      loading: false,
      error: "",
      data: action.payload
    });
  });

  it('should handle CREATE_DRAFT_ERROR', () => {
    const action = {
      type: types.CREATE_DRAFT_ERROR,
      payload: 'error occurred'
    };
    expect(draftsReducer({}, action)).toEqual({
      loading: false,
      error: action.payload,
    });
  });

  it('should handle FETCH_DRAFTS', () => {
    const action = {
      type: types.FETCH_DRAFTS,
    };
    expect(draftsReducer({}, action)).toEqual({
      allDrafts: {
        loading: true,
        error: false,
      },
    });
  });

  it('should handle FETCH_DRAFTS_SUCCESS', () => {
    const action = {
      type: types.FETCH_DRAFTS_SUCCESS,
      payload: {
        title: "Draft One",
        body: "This is just a draft that does not really make sense. It will be updated later",
      }
    };
    expect(draftsReducer({}, action)).toEqual({
      allDrafts: {
        loading: false,
        error: false,
        data: action.payload
      },
    });
  });

  it('should handle FETCH_DRAFTS_ERROR', () => {
    const action = {
      type: types.FETCH_DRAFTS_ERROR,
      payload: true
    };
    expect(draftsReducer({}, action)).toEqual({
      allDrafts: {
        loading: false,
        error: true,
      },
    });
  });
});
