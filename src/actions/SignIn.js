import axios from "axios";

import { USER_SIGN_IN_FULFILLED, USER_SIGN_IN_FAILED } from "./action.types";

const API = "https://thor-ah-staging.herokuapp.com";

const signInSuccess = body => ({
  type: USER_SIGN_IN_FULFILLED,
  payload: body
});

const signInFailure = error => ({
  type: USER_SIGN_IN_FAILED,
  payload: error
});

const signIn = (user) => {
  console.log(user);
  return (dispatch) => {
    axios
      .post(`${API}/api/users/login`, user)
      .then(response => {
        console.log(response);
        localStorage.setItem("token", response.data.user.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        return dispatch(signInSuccess(response));
      })
      .catch(error => {
        console.log(error);
        dispatch(signInFailure(error.response.data));
      });
  };
}

export default signIn;
