import React, { createContext, useContext, useEffect, useState } from 'react';

import { useAuth } from './auth';

const WsContext = createContext({});

export const WsProvider = ({ children }) => {
  const { accessToken } = useAuth();
  const [ws, setWs] = useState(
    accessToken ? new WebSocket('ws://localhost:8080/' + 'token=' + accessToken) : null,
  );

  useEffect(() => {
    if(!ws && accessToken) setWs(new WebSocket('ws://localhost:8080/' + 'token=' + accessToken));
  }, [accessToken]);

  return <WsContext.Provider value={{ ws }}>{children}</WsContext.Provider>;
};

export const useWs = () => {
  return useContext(WsContext);
};
