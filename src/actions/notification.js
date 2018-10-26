import axios from "axios";
import { NOTIFICATION_SUCCESS, NOTIFICATION_ERROR } from '../actionTypes/notification'


const API = process.env.REACT_APP_API;
const { token } = localStorage;

const success = (notifications) => ({
    type: NOTIFICATION_SUCCESS,
    payload: notifications,
})

const error = (err) => ({
    type: NOTIFICATION_ERROR,
    payload: err,
})

export const fetchNotifications = () => (dispatch) => axios.get(`${API}/api/users/notifications`, {
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}).then((response) => dispatch(success(response.data))
).catch(() => dispatch(error('server unreachable'))
);

export const deleteNotification = (id) => (dispatch) => axios.delete(`${API}/api/users/notifications/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}).then(() => dispatch(fetchNotifications())
).catch(() => dispatch(error('server unreachable')))
