
import signup from '../../reducers/signup';
import auth from '../../reducers/auth';
import * as types from '../../actionTypes/signup';

describe('user reducer', () => {
    it('should return initial state', () => {
        expect(signup(undefined, {})).toEqual(
            {
                loading: false,
                error: '',
            }
        );
    });

    it('should handle LOADING', () => {
        const action = { type: types.SIGNUP_LOADING, payload: true };
        expect(signup({}, action)).toEqual({
            loading: true,
            error: '',
        });
    });

    it('should handle SIGNUP_ERROR', () => {
        const action = { type: types.SIGNUP_ERROR, payload: { email: 'email is already registered' } };
        expect(signup({}, action)).toEqual({
            error: { email: 'email is already registered' },
        });
    });

    it('should handle SIGNUP_SUCCESS', () => {
        const action = { type: types.SIGNUP_SUCCESS, payload: { user: { id: 1, email: 'tst@mail.com', token: '_test_toKen' } } };
        expect(auth({}, action)).toEqual({
            isAuthenticated: true,
            user: { id: 1, email: 'tst@mail.com', token: '_test_toKen' }
        }
        );
    });
});
