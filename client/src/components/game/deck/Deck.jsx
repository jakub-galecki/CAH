import './deck.scss';

import React from 'react';

import { CardReverse } from '../cards/CardReverse';

const Deck = ({ color, cardsLeft, cardsMax }) => {
  const cardsToRender = cardsLeft > 10 ? 10 : cardsLeft;

  const cardElements = new Array(cardsToRender);
  for (let i = 0; i < cardsToRender; i++) {
    const element = (
      <CardReverse
        color={color}
        bottomOffset={i * 3}
        rightOffset={i * 3}
        text={i === cardsToRender - 1 ? 'Cards Against Humanity' : ''}
      />
    );
    cardElements.push(element);
  }

  return (
    <div className={`deck ${color}`}>
      {cardElements}
      <span className="cards-in-deck-counter">
        {cardsLeft}/{cardsMax}
      </span>
    </div>
  );
};

export { Deck };
