import {
  UPLOAD_PHOTO_FAILED,
  UPLOAD_PHOTO_SUCCESS,
  UPLOAD_PHOTO_REQUEST,
} from '../actionTypes/updateUser';
import initialState from '../store/initialState';

const uploadProfilePhoto = (state = initialState.profilePhoto, action) => {
  switch (action.type) {
    case UPLOAD_PHOTO_REQUEST:
      return {
        ...state,
        loading: action.payload,
      }
    case UPLOAD_PHOTO_SUCCESS:
      return {
        ...state,
        photo: action.payload
      }
    case UPLOAD_PHOTO_FAILED:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}

export default uploadProfilePhoto;
