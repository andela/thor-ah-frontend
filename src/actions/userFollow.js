import axios from 'axios';
import {
  FETCH_USER_FOLLOW_SUCCESS,
  FETCH_USER_FOLLOW_REQUEST,
  FETCH_USER_FOLLOW_FAILED,
} from '../actionTypes/userFollow';

const API = process.env.REACT_APP_API;
const { token } = window.localStorage;

const fetchUserFollowSuccess = data => ({
  type: FETCH_USER_FOLLOW_SUCCESS,
  payload: data,
});

const fetchUserFollowRequest = state => ({
  type: FETCH_USER_FOLLOW_REQUEST,
  payload: state,
});

const fetchUserFollowFailed = error => ({
  type: FETCH_USER_FOLLOW_FAILED,
  payload: error,
});

const fetchFollowers = () => axios.get(`${API}/api/users/follow/followers`, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-type': 'application/json',
  }
});

const fetchFollowing = () => axios.get(`${API}/api/users/follow/followings`, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-type': 'application/json',
  }
});

const fetchUserFollow = () => dispatch => {
  dispatch(fetchUserFollowRequest(true));
  return axios.all([fetchFollowers(), fetchFollowing()])
    .then(axios.spread((followers, following) => {
      const follows = {
        followers: followers.data.followers.length,
        following: following.data.following.length,
      }
      dispatch(fetchUserFollowSuccess(follows));
      return dispatch(fetchUserFollowRequest(false));
    }))
    .catch ((error) => {
      if (error) {
        dispatch(fetchUserFollowFailed('Error occurred. Please try again later'));
        dispatch(fetchUserFollowRequest(false));
      }
    })
}

export default fetchUserFollow;
