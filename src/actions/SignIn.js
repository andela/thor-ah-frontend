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
        localStorage.setItem("token", response.user.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        return dispatch(signInSuccess(response));
      })
      .catch(error => {       
        dispatch(signInFailure(error.response.data));
      });
  };
}

export default signIn;
