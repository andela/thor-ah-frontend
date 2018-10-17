import {
    FAVORITE_LOADING,
    FAVORITE_SUCCESS,
    FAVORITE_ERROR
} from '../actionTypes/favorite'
import initialState from '../store/initialState';

export default function reducer(state = initialState.favoriteArticle, action) {
    switch (action.type) {
        case FAVORITE_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case FAVORITE_ERROR:
            return {
                ...state,
                error: action.payload
            }

        case FAVORITE_SUCCESS:
            return {
                ...state,
                message: action.payload
            }

        default:
            return state
    }
} 
