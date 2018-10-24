import axios from 'axios';
import * as types from '../actionTypes/community';

const API = process.env.REACT_APP_API;

const fetchFollowersLoading = (isLoading) => ({
  type: types.FETCH_FOLLOWERS_LOADING,
  payload: isLoading
});

const fetchFollowersSuccess = (followers) => ({
  type: types.FETCH_FOLLOWERS_SUCCESS,
  payload: followers,
});

const fetchFollowersError = (error) => ({
  type: types.FETCH_FOLLOWERS_FAILURE,
  payload: error,
});


const fetchFollowingLoading = (isLoading) => ({
  type: types.FETCH_FOLLOWING_LOADING,
  payload: isLoading
});

const fetchFollowingSuccess = (following) => ({
  type: types.FETCH_FOLLOWING_SUCCESS,
  payload: following,
});

const fetchFollowingError = (error) => ({
  type: types.FETCH_FOLLOWING_FAILURE,
  payload: error,
});



const fetchFollowers = () => dispatch => {
  dispatch(fetchFollowersLoading(true));
  const { token } = localStorage;
  return axios.get(`${API}/api/users/follow/followers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      dispatch(fetchFollowersLoading(false));
      dispatch(fetchFollowersSuccess(response.data.followers));
    })
    .catch(() => {
      dispatch(fetchFollowersLoading(false));
      dispatch(fetchFollowersError('Error loading followers'));
    })
};

const fetchFollowing = () => dispatch => {
  dispatch(fetchFollowingLoading(true));
  const { token } = localStorage;
  return axios.get(`${API}/api/users/follow/followings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      dispatch(fetchFollowingLoading(false));
      dispatch(fetchFollowingSuccess(response.data.following));
    })
    .catch(() => {
      dispatch(fetchFollowingLoading(false));
      dispatch(fetchFollowingError('Error loading following'));
    })
}

const community = {
  fetchFollowers,
  fetchFollowing,
};

export default community;
