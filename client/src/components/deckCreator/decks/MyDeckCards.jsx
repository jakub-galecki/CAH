import './deckCards.scss';

import React from 'react';

import { EditableCard } from '../cards/EditableCard';

const MyDeckCards = ({ deck, updateCard, addCard, removeCard }) => {
  return (
    <div className="deck-cards">
      <EditableCard isPlaceholder={true} addCard={addCard} />
      {deck.cards.map((card) => (
        <EditableCard
          key={card.id}
          id={card.id}
          updateCard={updateCard}
          removeCard={removeCard}
        >
          {card.cardText}
        </EditableCard>
      ))}
    </div>
  );
};

export { MyDeckCards };
