import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { DeckCreator, Game, Home, Lobby, RoomList } from '../../pages';
import { PageTransitions } from '../transitions/index';

export const Routing = () => {
  return (
    <Route
      render={({ location }) => {
        const { key } = location;

        return (
          <PageTransitions keyValue={key}>
            <Switch location={location}>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/deckCreator">
                <DeckCreator />
              </Route>
              <Route path="/room">
                <Lobby />
              </Route>
              <Route path="/roomList">
                <RoomList />
              </Route>
              <Route path="/game">
                <Game />
              </Route>
            </Switch>
          </PageTransitions>
        );
      }}
    />
  );
};
