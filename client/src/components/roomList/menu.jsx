import './menu.scss';

import { Back, BookOpen, Log } from '@icon-park/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Popup } from '../navigation/rules.jsx';
import { Create } from './new_room.jsx';
const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="menu">
      <div className="menuText">
        <Link to="/" className="menuLink">
          <Back className="menuIcon" />
          <br />
          Homepage
        </Link>
      </div>
      <div className="menuText">
        <Link to="/deckCreator" className="menuLink">
          <Log className="menuIcon" />
          <br />
          Deck Creator
        </Link>
      </div>
      <div className="menuText">
        <Create />
      </div>
      <div className="menuText" onClick={togglePopup}>
        <BookOpen className="menuIcon" />
        <br />
        Rules
      </div>
      {isOpen && <Popup className="menuText" handleClose={togglePopup} />}
    </div>
  );
};
export { Menu };
