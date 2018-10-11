import signIn from "../reducers/signin";
import * as types from "../actionTypes/signin";

describe("signin reducer", () => {
  it("should handle SIGN_IN_LOADING", () => {
    const action = {
      type: types.SIGN_IN_LOADING,
      payload: { email: "su@mail.com", password: "password" }
    };
    expect(signIn({}, action)).toEqual({
      loading: { "email": "su@mail.com", "password": "password" }
    });
  });

  it("should handle SIGN_IN_FAILURE", () => {
    const action = {
      type: types.SIGN_IN_FAILURE,
      payload: { email: "suo@mail.com", password: "passwored", error: "" }
    };
    expect(signIn({}, action)).toEqual({
      error: undefined
    });
  });
});
