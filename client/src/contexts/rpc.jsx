import React, { createContext, useContext, useEffect, useState } from 'react';

import { RpcClient } from '../utils/RpcClient.js';
import { useAuth } from './auth';

const RpcContext = createContext({});

export const RpcProvider = ({ children }) => {
  const { accessToken } = useAuth();
  const [ws, setWs] = useState(null);
  const [rpc, setRpc] = useState(null);

  // info: new ws whenever accessToken changes 
  useEffect(() => {
    if(accessToken) setWs(new WebSocket('ws://localhost:8080/' + 'token=' + accessToken));
  }, [accessToken]);

  // info: new rpc whenever ws changes
  useEffect(() => {
    if(ws) setRpc(new RpcClient(ws));
  }, [ws])

  return <RpcContext.Provider value={{ rpc }}>{children}</RpcContext.Provider>;
};

export const useRpc = () => {
  return useContext(RpcContext);
};
