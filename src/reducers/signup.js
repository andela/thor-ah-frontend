import {
    LOADING,
    SIGNUP_ERROR
} from '../actions/types/signup';
import initialState from '../store/initialState';

export default function signup(state = initialState.auth.signup, action) {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: action.payload,
                error: ''
            };
        case SIGNUP_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};
