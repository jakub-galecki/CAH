import './style.css';

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
const Navigation = () => {
  const { pathname } = useLocation();

  return (
    <nav className="navigation">
      <ul>
        <li className={pathname == '/' ? 'active' : ''}>
          <Link to="/">Home</Link>
        </li>
        <li className={pathname == '/deckCreator' ? 'active' : ''}>
          <Link to="/deckCreator">Deck Creator</Link>
        </li>
        <li className={pathname == '/room' ? 'active' : ''}>
          <Link to="/room">Room</Link>
        </li>
        <li className={pathname == '/roomList' ? 'active' : ''}>
          <Link to="/roomList">Room List</Link>
        </li>
        <li className={pathname == '/game' ? 'active' : ''}>
          <Link to="/game">Game</Link>
        </li>
      </ul>
    </nav>
  );
};

export { Navigation };
