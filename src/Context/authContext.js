import React, { createContext, useState } from 'react';
import { login } from '../services/login/loginService';
import PropTypes from 'prop-types';

const Context = createContext(undefined);

const ContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (user) => {
    const response = await login(user);

    if (response && response.ok && response.data) {
      const { token } = response.data;

      localStorage.setItem('token', token);
      setAuth(true);
    }
    return response;
  };

  const handleLogout = async () => {
    localStorage.removeItem('token');
    setAuth(false);
    window.location.href = '/login';
  };

  return (
    <Context.Provider value={{ auth, handleLogin, handleLogout, loading, setLoading }}>
      {children}
    </Context.Provider>
  );
};

ContextProvider.propTypes = { children: PropTypes.any };

export { Context, ContextProvider };
