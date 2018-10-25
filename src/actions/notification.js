import axios from "axios";
import { NOTIFICATION_SUCCESS } from '../actionTypes/notification'


const API = process.env.REACT_APP_API;
const { token } = localStorage;

export const success = (notifications) => ({
    type: NOTIFICATION_SUCCESS,
    payload: notifications,
})

export const fetchNotifications = () => (dispatch) => axios.get(`${API}/api/users/notifications`, {
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}).then((response) => {
    return dispatch(success(response.data));
}).catch();

export const deleteNotification = (id) => (dispatch) => axios.delete(`${API}/api/users/notifications/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}).then((response) => {
    dispatch(fetchNotifications());
    return response
}).catch()
