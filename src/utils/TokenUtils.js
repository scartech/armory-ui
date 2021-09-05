class TokenUtils {
  static getUser = () => {
    return JSON.parse(sessionStorage.getItem('user'));
  };

  static clear = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  };
}

export { TokenUtils };
