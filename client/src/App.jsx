import './App.scss';

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Navigation } from './components/navigation';
import { DeckCreator } from './pages/deckCreator';
import { Game } from './pages/game';
import { Home } from './pages/home';
import { Room } from './pages/room';
import { RoomList } from './pages/roomList';

const App = () => (
  <div className="app">
    <Router>
      <>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/deckCreator">
            <DeckCreator />
          </Route>
          <Route path="/room">
            <Room />
          </Route>
          <Route path="/roomList">
            <RoomList />
          </Route>
          <Route path="/game">
            <Game />
          </Route>
        </Switch>
      </>
    </Router>
  </div>
);

export { App };
