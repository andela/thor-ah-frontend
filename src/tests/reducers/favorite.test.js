import favorite from "../../reducers/favorite";
import {
    FAVORITE_ERROR,
    FAVORITE_LOADING,
    FAVORITE_SUCCESS
} from "../../actionTypes/favorite";

describe("favorite article reducer", () => {

    it("should return initial state", () => {
        expect(favorite(undefined, {})).toEqual({
            loading: false,
            error: "",
            message: ""
        });
    });

    it("should handle FAVORITE_SUCCESS", () => {
        const action = {
            type: FAVORITE_SUCCESS,
            payload: {
                article: "bookmark added successfully"
            }
        }
        expect(favorite({}, action)).toEqual({ message: action.payload });
    });

    it("should handle FAVORITE_LOADING", () => {
        const action = {
            type: FAVORITE_LOADING,
            payload: true
        }
        expect(favorite({}, action)).toEqual({
            loading: action.payload
        });
    });

    it("should handle FAVORITE_ERROR", () => {
        const action = {
            type: FAVORITE_ERROR,
            payload: "error"
        };
        expect(favorite({}, action)).toEqual({
            error: action.payload
        });
    });
});
