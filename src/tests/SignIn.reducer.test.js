import signIn from "../reducers/SignIn";
import * as types from "../actions/action.types";

describe("signin reducer", () => {
  it("should return initial state", () => {
    expect(signIn(undefined, {})).toEqual({
      signingIn: false,
      user: {},
      token: '',
      error: ''
    });
  });
  it("should handle SIGNING_IN_REQUEST", () => {
    const action = {
      type: types.SIGNING_IN_REQUEST,
      payload: { email: "su@mail.com", password: "password" }
    };
    expect(signIn({}, action)).toEqual({
      signingIn: true,
      error: ''
    });
  });

  it("should handle USER_SIGN_IN_FULFILLED", () => {
    const action = {
      type: types.USER_SIGN_IN_FULFILLED,
      payload: { email: "su@mail.com", password: "passwored" }
    };
    expect(signIn({}, action)).toEqual({
      signingIn: false,
      error: '',
      token: undefined,
      user: undefined
    });
  });

  it("should handle USER_SIGN_IN_FAILED", () => {
    const action = {
      type: types.USER_SIGN_IN_FAILED,
      payload: { email: "suo@mail.com", password: "passwored", error: ""}
    };
    expect(signIn({}, action)).toEqual({
      signingIn: false
    });
  });
});
