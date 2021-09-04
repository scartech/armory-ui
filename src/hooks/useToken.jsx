import { useState } from 'react';
import jwt from 'jwt-decode';

const useToken = () => {
  const getToken = () => {
    return sessionStorage.getItem('token');
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    try {
      sessionStorage.setItem('token', userToken);

      const val = jwt(userToken);
      sessionStorage.setItem('user', JSON.stringify(val.user));
      setToken(userToken);
    } catch (error) {
      console.error(error.message);
    }
  };

  return {
    token,
    setToken: saveToken,
  };
};

export { useToken };
