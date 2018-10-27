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

const followUserLoading = (loading) => ({
  type: types.FOLLOW_USER_LOADING,
  payload: loading,
});

const followUserSuccess = (data) => ({
  type: types.FOLLOW_USER_SUCCESS,
  payload: data,
});

const unFollowUserLoading = (loading) => ({
  type: types.UNFOLLOW_USER_LOADING,
  payload: loading,
});

const unFollowUserSuccess = (data) => ({
  type: types.UNFOLLOW_USER_SUCCESS,
  payload: data,
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

const setIsFollowing = isFollowing => ({
  type: types.SET_IS_FOLLOWING,
  payload: isFollowing,
})

const checkIsFollowing = (users, username) => setIsFollowing(
    users.some(user => user.username === username)
  );

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
      const { following } = response.data;
      return following;
    })
    .catch(() => {
      dispatch(fetchFollowingLoading(false));
      dispatch(fetchFollowingError('Error loading following'));
    })
}

const followUser = (username) => dispatch => {
  dispatch(followUserLoading(true));
  const { token } = localStorage;
  return axios.post(
    `${API}/api/users/follow`,
    {
      username,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  )
    .then((response) => {
      dispatch(followUserLoading(false));
      dispatch(followUserSuccess(response.data));
    })
    .catch(() => {
      dispatch(followUserLoading(false));
    })
}

const unFollowUser = (username) => dispatch => {
  dispatch(unFollowUserLoading(true));
  const { token } = localStorage;
  return axios.delete(
    `${API}/api/users/follow`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        username,
      },
    }
  )
    .then((response) => {
      dispatch(unFollowUserLoading(false));
      dispatch(unFollowUserSuccess(response.data));
    })
    .catch(() => {
      dispatch(unFollowUserLoading(false));
    })
}

const removeUserFromFollowing = (idx) => ({
  type: types.REMOVE_USER_FROM_LIST,
  payload: idx,
})

const community = {
  fetchFollowers,
  fetchFollowing,
  followUser,
  unFollowUser,
  checkIsFollowing,
  removeUserFromFollowing,
};

export default community;
