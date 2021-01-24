import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { CustomToastContainer } from './components/customToastContainer/index';
import { Navigation } from './components/navigation';
import { Routing } from './components/routing/Routing';
import { AuthProvider } from './contexts/auth';
import { ConnectionProvider } from './contexts/connection';
import { GameProvider } from './contexts/game';
import { RoomProvider } from './contexts/room';

const App = () => (
  <div className="app">
    <Router>
      <AuthProvider>
        <ConnectionProvider>
          <RoomProvider>
            <GameProvider>
              <Navigation />
              <Routing />
              <CustomToastContainer />
            </GameProvider>
          </RoomProvider>
        </ConnectionProvider>
      </AuthProvider>
    </Router>
  </div>
);

export { App };
