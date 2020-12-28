import './playedCards.scss';

import React from 'react';
import { useDrop } from 'react-dnd';

import { PlayedCard } from '../cards/PlayedCard';

const PlayedCards = ({ numberOfCards }) => {
  const [, drop] = useDrop({
    accept: 'card',
  });

  const playedCards = Array(numberOfCards);
  for (let i = 0; i < numberOfCards; i++) {
    const card = <PlayedCard></PlayedCard>;
    playedCards.push(card);
  }

  return (
    <div ref={drop} className="played-cards">
      {playedCards}
    </div>
  );
};

export { PlayedCards };
