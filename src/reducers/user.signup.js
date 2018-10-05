import {
    LOADING,
    USER_SIGN_UP_FULFILLED,
    USER_SIGN_UP_FAILED,
} from '../actions/action.types';

const initialState = {
    user: {},
    loading: false,
    error: '',
};

export default function Signup(state = initialState, action) {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case USER_SIGN_UP_FULFILLED:
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: ''
            };
        case USER_SIGN_UP_FAILED:
            return {
                ...state,
                loading: false,
                user: {},
                error: action.payload,
            };
        default:
            return state;
    }
};
