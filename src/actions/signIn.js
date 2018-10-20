import axios from "axios";

import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  CLEAR_ERROR,
  SIGN_IN_LOADING
} from "../actionTypes/signin";

const API = process.env.REACT_APP_API;

const signInSuccess = body => ({
  type: SIGN_IN_SUCCESS,
  payload: body
});

const signInFailure = error => ({
  type: SIGN_IN_FAILURE,
  payload: error
});

const signInLoading = payload => ({
  type: SIGN_IN_LOADING,
  payload
});

export const clearErrors = () => ({
  type: CLEAR_ERROR
});

const signIn = user => dispatch => {
  dispatch(signInLoading(true));
  return axios
    .post(`${API}/api/users/login`, user)
    .then(response => {
      localStorage.setItem("token", response.data.user.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      dispatch(signInLoading(false));
      dispatch(signInSuccess(response.data));
    })
    .catch(error => {
      dispatch(signInLoading(false));
      if (error.response) {
        return dispatch(signInFailure(error.response.data));
      }
      return dispatch(
        signInFailure({
          error: { message: "Server unreachable at the moment" }
        })
      );
    });
};

export const handleSocialAuth = (authUrl) => (dispatch) => {
  dispatch(signInLoading(true));
  return axios
    .get(`${API}${authUrl}`)
    .then((response) => {
      localStorage.setItem('token', response.data.user.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      dispatch(signInLoading(false));
      dispatch(signInSuccess(response.data));
    })
    .catch(() => {
      dispatch(signInLoading(false));
      return dispatch(signInFailure({
        error: {
          message: "unable to sign in at this time"
        }
      }));
    })
}

export default signIn;
