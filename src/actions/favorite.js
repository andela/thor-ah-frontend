import axios from 'axios'
import {
    FAVORITE_ERROR,
    FAVORITE_LOADING,
    FAVORITE_SUCCESS
} from '../actionTypes/favorite'

const API = process.env.REACT_APP_API;

const loading = (payload) => ({
    type: FAVORITE_LOADING,
    payload
})

const success = (payload) => ({
    type: FAVORITE_SUCCESS,
    payload
})

const failure = (payload) => ({
    type: FAVORITE_ERROR,
    payload
})

const addFavorite = (articleId) => dispatch => {
    dispatch(loading(true))
    const { token } = localStorage

    return axios.post(`${API}/api/article/${articleId}/favorite`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }).then(response => {
        dispatch(loading(false))
        return dispatch(success(response.data.message))

    }).catch(error => {
        dispatch(loading(false))
        if (error.response) {
            return dispatch(failure(error.response.data.error.message))
        }
        return dispatch(failure("Server unreachable at the moment"))
    })

}

const deleteFavorite = (articleId) => dispatch => {
    dispatch(loading(true))

    const { token } = localStorage

    return axios
        .delete(`${API}/api/article/${articleId}/favorite`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then(response => {
            dispatch(loading(false))
            return dispatch(success(response.data.message))

        }).catch(error => {
            dispatch(loading(false))
            if (error.response) {
                return dispatch(failure(error.response.data.error.message))
            }
            return dispatch(failure("Server unreachable at the moment"))
        })

}

export { addFavorite, deleteFavorite }
