import jwt from 'jsonwebtoken';
import userIsLoggedIn from '../../utils/userIsLoggedIn';

describe('userIsLoggedIn', () => {
  let user;
  beforeEach(() => {
    const token = jwt.sign({ id: 1}, 'secret', { expiresIn: '24h'});
    user ={
      id: 1,
      name: 'John Doe',
      token,
    }
  });

  it('should return a boolean', () => {
    expect(typeof userIsLoggedIn()).toBe('boolean');
  });

  it('should return false if user is not set', () => {
    expect(userIsLoggedIn()).toEqual(false);
  });

  it('should return false if token is not decodable', () => {
    const irregularToken = 'some.dumb.token';
    user.token = irregularToken;
    window.localStorage.setItem('user', JSON.stringify(user));
    expect(userIsLoggedIn()).toEqual(false);
  });

  it('should return true if token is not expired', () => {
    window.localStorage.setItem('user', JSON.stringify(user));
    expect(userIsLoggedIn()).toEqual(true);
  });

  it('should return false if token is expired', () => {
    const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTM3ODc3MTk1LCJleHAiOjE1Mzc4NzcxOTZ9.peXgmzR1Any3D-MVcXmwPYr_imS4BwVYZbxKyHsb2pc';
    user.token = expiredToken;
    window.localStorage.setItem('user', JSON.stringify(user));
    expect(userIsLoggedIn()).toEqual(false);
  });
});
