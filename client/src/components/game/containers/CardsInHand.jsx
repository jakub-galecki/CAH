import './cardsInHand.scss';

import React from 'react';

import { AnswerCard } from '../cards/AnswerCard';

const CardsInHand = ({ cards }) => {
  return (
    <div className="cards-in-hand">
      {cards.map(({ id, cardText }) => (
        <AnswerCard key={id}>{cardText}</AnswerCard>
      ))}
    </div>
  );
};

export { CardsInHand };
