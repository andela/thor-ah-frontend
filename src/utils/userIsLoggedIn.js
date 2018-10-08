import jwtDecode from 'jwt-decode';

const userIsLoggedIn = () => {
  // early return if user is not set
  if (!localStorage.user) {
    return false;
  }
  const user = JSON.parse(localStorage.user);

  let decoded;

  try {
    decoded = jwtDecode(user.token);
    const { exp } = decoded;
    const currentDate = new Date();

    // check if token is still valid
    return ((exp * 1000) - currentDate.getTime()) > 1;
  } catch (error) {
    return false;
  }
};

export default userIsLoggedIn;
