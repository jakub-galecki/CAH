import './App.scss';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Navigation } from './components/navigation';
import { Routing } from './components/routing/Routing';
import { AuthProvider } from './contexts/auth';

const App = () => (
  <div className="app">
    <Router>
      <AuthProvider>
        <Navigation />
        <Routing />
      </AuthProvider>
    </Router>
  </div>
);

export { App };
