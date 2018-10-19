import axios from 'axios';
import {
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_FAILED,
  UPLOAD_PHOTO_FAILED,
  UPLOAD_PHOTO_SUCCESS,
  UPLOAD_PHOTO_REQUEST,
} from '../actionTypes/updateUser';
import { setLoggedInUser } from './auth';

const API = process.env.REACT_APP_API;
const { token } = window.localStorage;

const updateUserFailed = error => ({
  type: UPDATE_USER_INFO_FAILED,
  payload: error,
});

const updateUserRequest = state => ({
  type: UPDATE_USER_INFO_REQUEST,
  payload: state,
});

const uploadPhotoRequest = state => ({
  type: UPLOAD_PHOTO_REQUEST,
  payload: state,
})

const uploadPhotoFailed = error => ({
  type: UPLOAD_PHOTO_FAILED,
  payload: error,
});

const uploadPhotoSuccess = url => ({
  type: UPLOAD_PHOTO_SUCCESS,
  payload: url,
});

export const uploadPhoto = file => dispatch => {
  dispatch(uploadPhotoRequest(true));

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);

  return axios({
    method: 'POST',
    url: process.env.CLOUDINARY_URL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: formData,
  })
    .then(response => {
      const { url } = response.data;
      dispatch(uploadPhotoSuccess(url));
      dispatch(uploadPhotoRequest(false));
      return response.data;
    })
    .catch(() => {
      dispatch(uploadPhotoFailed('Photo upload failed. Please try again later'));
      dispatch(uploadPhotoRequest(false));
    });
}

const updateUser = data => dispatch => {
  dispatch(updateUserRequest(true));
  const { role, email, username, profilePhoto, rNewPassword, newPassword, ...rest } = data;
  axios
    .put(`${API}/api/users`, { ...rest }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json'
      }
    })
    .then((response) => {
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(response.data.user));
      dispatch(setLoggedInUser(response.data.user));
      return dispatch(updateUserRequest(false));
    })
    .catch((error) => {
      const errors = error.response.data.error;
      let errorMessage = '';
      Object.keys(errors).forEach(err => {
        errorMessage += `${errors[err]}. `
      });
      dispatch(updateUserFailed(errorMessage));
      return dispatch(updateUserRequest(false));
    });
}

export default updateUser;
