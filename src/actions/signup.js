import axios from 'axios';

import {
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    SIGNUP_LOADING
} from '../actionTypes/signup';

const API = "https://thor-ah-staging.herokuapp.com";

const signupSuccess = body => ({
    type: SIGNUP_SUCCESS,
    payload: body
});

const signupError = error => ({
    type: SIGNUP_ERROR,
    payload: error
});

const signupLoading = (payload) => ({ type: SIGNUP_LOADING, payload })

function signUp(user) {
    return (dispatch) => {
        dispatch(signupLoading(true));
        axios.post(`${API}/api/users`, user)
            .then((response) => {
                localStorage.setItem("token", response.data.user.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                dispatch(signupLoading(false));
                dispatch(signupSuccess(response.data));
            })
            .catch((error) => {
                dispatch(signupLoading(false));
                if (error.response) {
                    return dispatch(signupError(error.response.data));
                }
                return dispatch(signupError({ error: { password: 'Server not reachable' } }))
            });
    }
}

export default signUp;
