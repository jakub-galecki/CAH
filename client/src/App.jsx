import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { CustomToastContainer } from './components/customToastContainer/index';
import { Navigation } from './components/navigation';
import { Routing } from './components/routing/Routing';
import { AuthProvider } from './contexts/auth';
import { RpcProvider } from './contexts/rpc';
import { WsProvider } from './contexts/ws';

const App = () => (
  <div className="app">
    <Router>
      <AuthProvider>
        <WsProvider>
          <RpcProvider>
            <Navigation />
            <Routing />
            <CustomToastContainer />
          </RpcProvider>
        </WsProvider>
      </AuthProvider>
    </Router>
  </div>
);

export { App };
