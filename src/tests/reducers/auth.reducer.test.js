import auth from '../../reducers/auth.reducer';
import * as types from '../../actions/action.types';

describe('user reducer', () => {
  it('should return initial state', () => {
    expect(auth(undefined, {})).toEqual({
      isAuthenticated: true,
      user: {},
    });
  });

  it('should handle SET_CURRENT_USER', () => {
    const action = { type: types.SET_CURRENT_USER, payload: {id: 1, name: 'some name'} };
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
