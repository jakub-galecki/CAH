import React, { createContext, useContext, useEffect, useState } from 'react';

import { RpcClient } from '../utils/RpcClient.js';
import { getServerWsUrl } from '../utils/serverURL';
import { useAuth } from './auth';

const ConnectionContext = createContext({});

export const ConnectionProvider = ({ children }) => {
  const { accessToken } = useAuth();
  const [ws, setWs] = useState(null);
  const [rpc, setRpc] = useState(null);

  // info: new ws whenever accessToken changes

  useEffect(() => {
    if (accessToken) {
      const newWs = new WebSocket(`${getServerWsUrl()}token=${accessToken}`);
      setWs(newWs);
    }
  }, [accessToken]);

  // info: new rpc whenever ws changes
  useEffect(async () => {
    if (ws) {
      const newRpc = new RpcClient(ws);
      setRpc(newRpc);
    }
  }, [ws]);

  return (
    <ConnectionContext.Provider value={{ rpc, ws }}>
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = () => {
  return useContext(ConnectionContext);
};
