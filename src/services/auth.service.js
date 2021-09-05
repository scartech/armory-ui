import jwt from 'jwt-decode';

class AuthService {
  static getUser = () => {
    const tokenValue = sessionStorage.getItem('token');
    if (!tokenValue) {
      return;
    }

    if (tokenValue) {
      const val = jwt(tokenValue);
      val.user.token = tokenValue;
      return val.user;
    }
  };
}

export { AuthService };
