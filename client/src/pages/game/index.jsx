import './style.css';

import React from 'react';

import { CardsInHand } from './CardsInHand';
import { Counter } from './Counter';
import { Deck } from './Deck';
import { cardsInHandData } from './dummyData';

const Game = () => (
  <div className="game">
    <CardsInHand cards={cardsInHandData}></CardsInHand>
    <div className="left-side-panel">
      <Deck color="black" cardsLeft={23} cardsMax={40}></Deck>
      <Counter></Counter>
      <Deck color="white" cardsLeft={44} cardsMax={80}></Deck>
    </div>
  </div>
);

export { Game };
