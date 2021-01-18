import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  const setToken = (givenToken) => {
    setAccessToken(givenToken);
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
