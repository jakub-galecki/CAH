import './playedCards.scss';

import React from 'react';

import { PlayedCard } from '../cards/PlayedCard';

const PlayedCards = ({ numberOfCards }) => {
  let playedCards = Array(numberOfCards);
  for (let i = 0; i < numberOfCards; i++) {
    let card = <PlayedCard></PlayedCard>;
    playedCards.push(card);
  }

  return <div className="played-cards">{playedCards}</div>;
};

export { PlayedCards };
