import React from 'react';

import { AnswerCard } from './AnswerCard';

const PlayedCards = ({ numberOfCards }) => {
  let playedCards = Array(numberOfCards);
  for (let i = 0; i < numberOfCards; i++) {
    let card = <AnswerCard text="Cards Against Humanity"></AnswerCard>;
    playedCards.push(card);
  }

  return <div className="played-cards">{playedCards}</div>;
};

export { PlayedCards };
