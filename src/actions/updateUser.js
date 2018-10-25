import axios from 'axios';
import {
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_FAILED,
  UPDATE_USER_INFO_SUCCESS,
  UPLOAD_PHOTO_FAILED,
  UPLOAD_PHOTO_SUCCESS,
  UPLOAD_PHOTO_REQUEST,
} from '../actionTypes/updateUser';

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

const updateUserSuccess = user => ({
  type: UPDATE_USER_INFO_SUCCESS,
  payload: user,
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
  formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);

  return axios({
    method: 'POST',
    url: process.env.REACT_APP_UPLOAD_URL,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
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

  return axios
    .put(`${API}/api/users`, { ...rest }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json'
      }
    })
    .then((response) => {
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(response.data.user));
      dispatch(updateUserSuccess(response.data.user));
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
