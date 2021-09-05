import { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';
import jwt from 'jwt-decode';
import { AuthService } from '../services';

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });

      sessionStorage.setItem('token', res.data.token);
      const val = jwt(res.data.token);

      // Store the JWT token in the user for use in calls to the API
      val.user.token = res.data.token;
      setUser(val.user);

      return val.user;
    } catch (error) {
      console.log('Login failed', error.response);

      setUser(false);
      return undefined;
    }
  };

  const signout = () => {
    sessionStorage.removeItem('token');
    setUser(false);
  };

  useEffect(() => {
    const existingUser = AuthService.getUser();
    if (existingUser) {
      setUser(existingUser);
    }
  }, []);

  return {
    user,
    signin,
    signout,
  };
}

export { useProvideAuth };
