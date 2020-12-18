import './style.css';

import React from 'react';

import { CardsInHand } from './CardsInHand';
import { cardsInHandData } from './dummyData';

const Game = () => (
  <div className="game">
    <CardsInHand cards={cardsInHandData}></CardsInHand>
  </div>
);

export { Game };
