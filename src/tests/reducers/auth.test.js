import auth from '../../reducers/auth';
<<<<<<< HEAD:src/tests/reducers/auth.reducer.test.js
import * as types from '../../actions/action.types';
=======
import * as types from '../../actions/types/auth';
>>>>>>> t nitPicks: fix ft-user-signup-159987624:src/tests/reducers/auth.test.js

describe('user reducer', () => {
  it('should return initial state', () => {
    expect(auth(undefined, {})).toEqual({
      isAuthenticated: false,
<<<<<<< HEAD:src/tests/reducers/auth.reducer.test.js
      signin: {error: '', loading: false},
      user: {}
    });
=======
      signup: { error: '', loading: false },
      "user": {}
    }
    );
>>>>>>> t nitPicks: fix ft-user-signup-159987624:src/tests/reducers/auth.test.js
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
