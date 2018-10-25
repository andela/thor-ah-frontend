import { UPDATE_USER_INFO_REQUEST } from '../../actionTypes/updateUser';
import updateUser from '../../reducers/updateUser';

describe('Update user info', () => {
    it('should return initial state', () => {
        expect(updateUser(undefined, {})).toEqual({
            loading: false,
            error: '',
            user: {},
        })
    });

    it('should handle UPDATE_USER_INFO_REQUEST', () => {
        const action = {
            type: UPDATE_USER_INFO_REQUEST,
            payload: true,
        }
        expect(updateUser({}, action)).toEqual({
            loading: action.payload,
        });
    });

    it('should handle UPDATE_USER_INFO_REQUEST', () => {
        const action = {
            type: UPDATE_USER_INFO_REQUEST,
            payload: false,
        }
        expect(updateUser({}, action)).toEqual({
            loading: action.payload,
        });
    });
});
