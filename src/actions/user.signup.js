import axios from 'axios';

import {
    USER_SIGN_UP_FULFILLED,
    USER_SIGN_UP_FAILED,
    LOADING
} from './action.types';

const API = "https://thor-ah-staging.herokuapp.com";

const signUpSuccess = body => ({
    type: USER_SIGN_UP_FULFILLED,
    payload: body
});

const signUpFailure = error => ({
    type: USER_SIGN_UP_FAILED,
    payload: error
});

const signUpLoading = () => ({ type: LOADING })

function signUp(user) {
    return (dispatch) => {
        dispatch(signUpLoading());
        axios.post(`${API}/api/users`, user)
            .then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                return dispatch(signUpSuccess(response.data));
            })
            .catch((error) => {
                if (error.response) {
                    dispatch(signUpFailure(error.response.data));
                }
                return dispatch(signUpFailure({ error: { password: 'Server not reachable' } }))
            });
    }
}

export default signUp;
