import "./menu.scss";

import { Back,Log,PlusCross } from '@icon-park/react';
import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {

    return (
    <div className="menu">
      <div className="menuText">
        <Link to="/" className="menuLink"><Back className="menuIcon"/><br/>Homepage</Link>
      </div>
      <div className="menuText">
        <Link to="/deckCreator" className="menuLink"><Log className="menuIcon"/><br/>Deck Creator</Link>
      </div>
      <div className="menuText">
        <Link to="/room" className="menuLink"><PlusCross className="menuIcon"/><br/>New Room</Link>
      </div>
    </div>
    );
};
  export { Menu }
