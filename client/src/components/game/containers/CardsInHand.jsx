import './cardsInHand.scss';

import React from 'react';

import { AnswerCard } from '../cards/AnswerCard';

const CardsInHand = ({ cards, playCardFromHand }) => {
  return (
    <div className="cards-in-hand">
      {cards.map(({ id, cardText }) => (
        <AnswerCard key={id} id={id} playCardFromHand={playCardFromHand}>
          {cardText}
        </AnswerCard>
      ))}
    </div>
  );
};

export { CardsInHand };
