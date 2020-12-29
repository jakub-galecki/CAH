import './playedCards.scss';

import React from 'react';
import { useDrop } from 'react-dnd';

import { PlayedCard } from '../cards/PlayedCard';

const PlayedCards = ({ numberOfCards }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'card',
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  const playedCards = Array(numberOfCards);
  for (let i = 0; i < numberOfCards; i++) {
    const card = <PlayedCard></PlayedCard>;
    playedCards.push(card);
  }

  return (
    <div
      ref={drop}
      className={`played-cards${isOver && canDrop ? ' card-hover' : ''}`}
    >
      {playedCards}
    </div>
  );
};

export { PlayedCards };
