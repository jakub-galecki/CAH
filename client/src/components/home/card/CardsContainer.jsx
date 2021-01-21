import './card.scss';

import React, { useState } from 'react';

import { Login } from '../forms/login';
import { Register } from '../forms/register';
import { BackCard } from './BackCard';
import { CardWrapper } from './CardWrapper';
import { FrontCard } from './FrontCard';

const CardsContainer = () => {
  const [activeCard, setActiveCard] = useState(null);

  const handleClick = side => {
    setActiveCard(side);
  };

  return (
    <div className="cards-container">
      <CardWrapper side="left" activeCard={activeCard}>
        <FrontCard handleClick={handleClick.bind(null, 'left')}>
          <h2>Login</h2>
        </FrontCard>
        <BackCard>
          <Login />
        </BackCard>
      </CardWrapper>
      <CardWrapper side="right" activeCard={activeCard}>
        <FrontCard handleClick={handleClick.bind(null, 'right')}>
          <h2>Register</h2>
        </FrontCard>
        <BackCard>
          <Register />
        </BackCard>
      </CardWrapper>
    </div>
  );
};

export { CardsContainer };
