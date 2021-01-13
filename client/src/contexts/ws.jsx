import React, { createContext, useContext, useEffect, useState } from 'react';

import { useAuth } from './auth';

const WsContext = createContext({});

export const WsProvider = ({ children }) => {
  const { accessToken } = useAuth();
  const [ws, setWs] = useState(
    new WebSocket('ws://localhost:8080/' + 'token=' + accessToken),
  );

  useEffect(() => {
    new WebSocket('ws://localhost:8080/' + 'token=' + accessToken);
  }, [accessToken]);
  // Cheap solution: prevent ws from closing
  ws.onclose = function () {
    setTimeout(() => {
      setWs(new WebSocket('ws://localhost:8080/' + 'token=' + accessToken));
    }, 1000);
  };

  return <WsContext.Provider value={{ ws }}>{children}</WsContext.Provider>;
};

export const useWs = () => {
  return useContext(WsContext);
};
