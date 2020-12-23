import './cardsInHand.scss';

import React from 'react';

import { AnswerCard } from '../cards/AnswerCard';

const CardsInHand = ({ cards }) => {
  return (
    <div className="cards-in-hand">
      {cards.map((card) => (
        <AnswerCard key={card.id} text={card.cardText}></AnswerCard>
      ))}
    </div>
  );
};

export { CardsInHand };
