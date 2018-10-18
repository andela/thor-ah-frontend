import initialState from '../store/initialState';
import * as types from '../actionTypes/drafts';

const draftsReducer = (state = initialState.drafts, action) => {
  switch (action.type) {
    case types.CREATE_DRAFT: {
      return {
        ...state,
        loading: action.payload,
      }
    }
    case types.CREATE_DRAFT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        data: action.payload
      }
    case types.CREATE_DRAFT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case types.FETCH_DRAFTS: {
      const allDrafts = {
        loading: true,
        error: false,
      };
      
      return {
        ...state,
        allDrafts
      }
    }
    case types.FETCH_DRAFTS_SUCCESS: {
      const allDrafts = {
        loading: false,
        error: false,
        data: action.payload
      };

      return {
        ...state,
        allDrafts
      }
    }
    case types.FETCH_DRAFTS_ERROR: {
      const allDrafts = {
        loading: false,
        error: true,
      };

      return {
        ...state,
        allDrafts
      }
    }
    default:
      return state;
  }
};


export default draftsReducer;
