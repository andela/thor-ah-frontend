import { UPDATE_USER_INFO_SUCCESS } from '../../actionTypes/updateUser';
import auth from '../../reducers/auth';
import * as types from '../../actionTypes/auth';

describe('user reducer', () => {
  it('should return initial state', () => {
    expect(auth(undefined, {})).toEqual({
      isAuthenticated: false,
      signin: { error: '', loading: false },
      signup: { error: '', loading: false },
      user: {}
    }
    );
  });

  it('should handle UPDATE_USER_INFO_SUCCESS', () => {
    const action = {
      type: UPDATE_USER_INFO_SUCCESS,
      payload: {
        firstName: 'Uche',
        lastName: 'Jude',
        email: 'test@test.com',
        image: null,
      }
    }
    expect(auth({}, action)).toEqual({
      isAuthenticated: true,
      user: {
        firstName: 'Uche',
        lastName: 'Jude',
        email: 'test@test.com',
        image: null,
      }
    });
  });

  it('should handle SET_CURRENT_USER', () => {
    const action = { type: types.SET_CURRENT_USER, payload: { id: 1, name: 'some name' } };
    expect(auth({}, action)).toEqual({
      isAuthenticated: true,
      user: {
        id: 1,
        name: 'some name'
      }
    });
  });

  it('should handle LOG_OUT_USER', () => {
    const action = { type: types.LOG_OUT_USER };
    expect(auth({}, action)).toEqual({
      isAuthenticated: false,
      user: {}
    });
  });
});
