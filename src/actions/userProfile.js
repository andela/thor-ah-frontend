import axios from 'axios';
import * as types from '../actionTypes/userProfile';

const API = process.env.REACT_APP_API;

const fetchProfileLoading = isFetching => ({
  type: types.FETCH_USER_PROFILE_LOADING,
  payload: isFetching,
});

const fetchProfileSuccess = profile => ({
  type: types.FETCH_USER_PROFILE_SUCCESS,
  payload: profile,
});

const fetchProfileFailure = error => ({
  type: types.FETCH_USER_PROFILE_FAILURE,
  payload: error,
});

const fetchUserProfile = (username) => (dispatch) => {
  dispatch(fetchProfileLoading(true));
  const { token } = localStorage;
  return axios.get(`${API}/api/users/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => {
      dispatch(fetchProfileLoading(false));
      dispatch(fetchProfileSuccess(response.data.profile));
    })
    .catch((error) => {
      dispatch(fetchProfileLoading(false));
      dispatch(fetchProfileFailure(error.message));
    })
};

const userProfile = {
  fetchUserProfile,
};

export default userProfile;
