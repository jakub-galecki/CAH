import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { CustomToastContainer } from './components/customToastContainer/index';
import { Navigation } from './components/navigation';
import { Routing } from './components/routing/Routing';
import { AuthProvider } from './contexts/auth';
import { WsProvider } from './contexts/ws';

const App = () => (
  <div className="app">
    <Router>
      <AuthProvider>
        <WsProvider>
          <Navigation />
          <Routing />
          <CustomToastContainer />
        </WsProvider>
      </AuthProvider>
    </Router>
  </div>
);

export { App };
