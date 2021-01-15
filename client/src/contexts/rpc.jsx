import React, { createContext, useContext, useEffect, useState } from 'react';

import { RpcClient } from '../utils/RpcClient.js';
import { useWs } from './ws';

const RpcContext = createContext({});

export const RpcProvider = ({ children }) => {
  const { ws } = useWs();
  const [rpc, setRpc] = useState(ws ? new RpcClient(ws) : null);

  useEffect(() => {
    if(ws) setRpc(new RpcClient(ws));
  }, [ws]);
  return <RpcContext.Provider value={{ rpc }}>{children}</RpcContext.Provider>;
};

export const useRpc = () => {
  return useContext(RpcContext);
};
