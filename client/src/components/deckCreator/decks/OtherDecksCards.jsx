import './deckCards.scss';

import React from 'react';

import { NonEditableCard } from '../cards/NonEditableCard';

const OtherDecksCards = ({ chosenDecks, addCard, isCardInMyDeck }) => {
  let cards = [];
  chosenDecks.forEach((deck) => {
    cards = cards.concat(
      deck.cards.map((card) => (
        <NonEditableCard
          key={card.id}
          addCard={addCard}
          isCardInMyDeck={isCardInMyDeck}
        >
          {card.cardText}
        </NonEditableCard>
      )),
    );
  });

  return <div className="deck-cards">{cards}</div>;
};

export { OtherDecksCards };
