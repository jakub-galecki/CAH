import './deck.scss';

import React from 'react';

import { CardReverse } from '../cards/CardReverse';

const Deck = ({ color, cardsLeft, cardsMax }) => {
  let cardsToRender = cardsLeft > 10 ? 10 : cardsLeft;

  let cardElements = new Array(cardsToRender);
  for (let i = 0; i < cardsToRender; i++) {
    let element = (
      <CardReverse
        color={color}
        bottomOffset={i * 3}
        rightOffset={i * 3}
        text={i == cardsToRender - 1 ? 'Cards Against Humanity' : ''}
      ></CardReverse>
    );
    cardElements.push(element);
  }

  return (
    <div className={'deck ' + color}>
      {cardElements}
      <span className="cards-in-deck-counter">
        {cardsLeft}/{cardsMax}
      </span>
    </div>
  );
};

export { Deck };
