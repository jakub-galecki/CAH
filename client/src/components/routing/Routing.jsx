import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { useConnection } from '../../contexts/connection';
import { DeckCreator, Game, Home, Lobby, RoomList } from '../../pages';
import { PageTransitions } from '../transitions/index';

export const Routing = () => {
  const { rpc } = useConnection();
  return (
    <Route
      render={({ location }) => {
        const { key } = location;
        // only login when not auth
        if (!rpc)
          return (
            <PageTransitions keyValue={key}>
              <Switch location={location}>
                <Route exact path="/">
                  <Home />
                </Route>
              </Switch>
            </PageTransitions>
          );
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
