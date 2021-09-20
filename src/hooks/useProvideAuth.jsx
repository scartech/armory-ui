import { useState, useEffect, useContext, createContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import jwt from 'jwt-decode';
import { AuthService } from '../services';
import { Config } from '../utils';

const authContext = createContext();

export function useAuth() {
  return useContext(authContext);
}

export function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = async (email, password) => {
    try {
      const res = await axios.post(`${Config.getAPIBaseUrl()}/login`, {
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

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

ProvideAuth.propTypes = {
  children: PropTypes.any.isRequired,
};
