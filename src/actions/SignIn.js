import axios from "axios";

import { USER_SIGN_IN_FULFILLED, USER_SIGN_IN_FAILED, CLEAR_ERROR, SIGNING_IN_REQUEST } from "./action.types";

const API = "https://thor-ah-staging.herokuapp.com";

const signInSuccess = body => ({
  type: USER_SIGN_IN_FULFILLED,
  payload: body
});

const signInFailure = error => ({
  type: USER_SIGN_IN_FAILED,
  payload: error
});

const sigingIn = () => ({
  type: SIGNING_IN_REQUEST,
})

export const clearErrors = () => ({
  type: CLEAR_ERROR
});

const signIn = (user) =>  (dispatch) => {
  dispatch(sigingIn());
  axios
    .post(`${API}/api/users/login`, user)
    .then(response => {
      localStorage.setItem("token", response.data.user.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return dispatch(signInSuccess(response));
    })
    .catch(error => {
      if (error.response && error.response.status === 'error') {
        return dispatch(signInFailure(error.response.data));
      }
      return dispatch(signInFailure({error: {message: 'Server unreachable at the moment'}}))
    })};

export default signIn;
