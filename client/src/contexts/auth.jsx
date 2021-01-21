import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const usrId = localStorage.getItem('userId');
    if (token && usrId) {
      setAccessToken(token);
      setUserId(usrId);
    }
  }, []);

  const setToken = givenToken => {
    localStorage.setItem('accessToken', givenToken);
    setAccessToken(givenToken);
  };

  const setUserIdWithLocalStorage = usrId => {
    localStorage.setItem('userId', usrId);
    setUserId(usrId);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken: accessToken,
        setAccessToken: setToken,
        userId,
        setUserId: setUserIdWithLocalStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
