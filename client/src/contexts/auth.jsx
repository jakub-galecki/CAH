import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) setAccessToken(token);
  }, []);

  const setToken = (token) => {
    localStorage.setItem('accessToken', token);
    setAccessToken(token);
  };
  return (
    <AuthContext.Provider
      value={{ accessToken: accessToken, setAccessToken: setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
