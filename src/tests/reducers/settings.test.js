import settings from "../../reducers/settings";
import * as types from "../../actionTypes/settings";

describe("settings reducer", () => {
  it("should return initial state", () => {
    expect(settings(undefined, {})).toEqual({
      loading: false,
      notifyArticle: true,
      notifyComment: true
    });
  });
  it("should handle NOTIFY_STATUS", () => {
    const action = {
      type: types.NOTIFY_STATUS,
      payload: [{suppressed:true},{suppressed: true}]
    };
    expect(settings({}, action)).toEqual({
      notifyArticle: true,
      notifyComment: true
    });
  });
  it("should handle NOTIFY_LOADING", () => {
    const action = {
      type: types.NOTIFY_LOADING,
      payload: {
        data: {}
      }
    };
    expect(settings({}, action)).toEqual({ loading: action.payload });
  });
});
