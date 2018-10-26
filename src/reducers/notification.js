import {
    NOTIFICATION_SUCCESS,
    NOTIFICATION_ERROR
} from '../actionTypes/notification'
import initialState from "../store/initialState"

export default function reducer(state = initialState.notification, action) {
    switch (action.type) {
        case NOTIFICATION_SUCCESS:
            return {
                ...state,
                notifications: action.payload.notifications,
            }
        case NOTIFICATION_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

