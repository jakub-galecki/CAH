import './card.scss';

import React, { useState } from 'react';

import { BackCard } from './BackCard';
import { CardWrapper } from './CardWrapper';
import { FrontCard } from './FrontCard';

const CardsContainer = () => {
  const [activeCard, setActiveCard] = useState(null);

  const handleClick = (side) => {
    setActiveCard(side);
  };

  return (
    <div className="cards-container">
      <CardWrapper side="left" activeCard={activeCard}>
        <FrontCard handleClick={handleClick.bind(null, 'left')}>
          <h2>Login</h2>
        </FrontCard>
        <BackCard>
          <form>
            <p>Hello, my login is</p>
            <input></input>,<p>and my password</p>
            <input></input>.
          </form>
        </BackCard>
      </CardWrapper>
      <CardWrapper side="right" activeCard={activeCard}>
        <FrontCard handleClick={handleClick.bind(null, 'right')}>
          <h2>Register</h2>
        </FrontCard>
        <BackCard>
          <form>
            <p>Hello, my email is</p>
            <input></input>,<p>my login will be</p>
            <input></input>,<p>and my password</p>
            <input></input>.
          </form>
        </BackCard>
      </CardWrapper>
    </div>
  );
};

export { CardsContainer };
