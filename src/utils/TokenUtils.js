class TokenUtils {
  static getUser = () => {
    return JSON.parse(sessionStorage.getItem('user'));
  };
}

export default TokenUtils;
