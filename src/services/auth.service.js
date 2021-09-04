class AuthService {
  static getUser = () => {
    const val = sessionStorage.getItem('user');
    if (!val) {
      return;
    }

    return JSON.parse(val);
  };
}

export { AuthService };
