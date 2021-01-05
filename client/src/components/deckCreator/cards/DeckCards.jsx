import './deckCards.scss';

import React from 'react';

import { EditableCard } from './EditableCard';

const DeckCards = ({ deck, updateCard, addCard, removeCard }) => {
  return (
    <div className="deck-cards">
      <EditableCard isPlaceholder={true} addCard={addCard}></EditableCard>
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

export { DeckCards };
