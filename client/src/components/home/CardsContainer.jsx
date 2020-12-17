import './cardsContainer.scss';

import React from 'react';

import { LoginCard, RegisterCard } from '.';

const CardsContainer = () => {
  return (
    <div className="cards-container">
      <LoginCard />
      <RegisterCard />
    </div>
  );
};

export { CardsContainer };
