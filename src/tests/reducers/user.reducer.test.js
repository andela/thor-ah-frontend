
import signup from '../../reducers/user.signup';
import * as types from '../../actions/action.types';

describe('user reducer', () => {
    it('should return initial state', () => {
        expect(signup(undefined, {})).toEqual(
            {
                user: {},
                loading: false,
                error: '',
            }
        );
    });

    it('should handle LOADING', () => {
        const action = { type: types.LOADING };
        expect(signup({}, action)).toEqual({
            loading: true,
            error: '',
        });
    });

    it('should handle USER_SIGN_UP_FULFILLED', () => {
        const action = { type: types.USER_SIGN_UP_FULFILLED, payload: { id: 1, email: 'tst@mail.com', token: '_test_toKen' } };
        expect(signup({}, action)).toEqual({
            user: { id: 1, email: 'tst@mail.com', token: '_test_toKen' },
            loading: false,
            error: '',
        });
    });

    it('should handle USER_SIGN_UP_FAILED', () => {
        const action = { type: types.USER_SIGN_UP_FAILED, payload: { email: 'email is already registered' } };
        expect(signup({}, action)).toEqual({
            user: {},
            loading: false,
            error: { email: 'email is already registered' },
        });
    });
});
