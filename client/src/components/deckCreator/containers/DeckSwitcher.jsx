import './deckSwitcher.scss';

import React, { useState } from 'react';

import { MyDeckCards } from '../decks/MyDeckCards';
import { OtherDecksCards } from '../decks/OtherDecksCards';

const DeckSwitcher = ({
  myDeck,
  chosenDecks,
  updateCard,
  addCard,
  removeCard,
}) => {
  const [showingMyDeck, setShowingMyDeck] = useState(true);

  const isCardInMyDeck = (cardContent) => {
    return myDeck.cards.some((card) => card.cardText === cardContent);
  };

  const myDeckCards = (
    <MyDeckCards
      deck={myDeck}
      updateCard={updateCard}
      addCard={addCard}
      removeCard={removeCard}
    ></MyDeckCards>
  );

  const otherDeckCards = (
    <OtherDecksCards
      chosenDecks={chosenDecks}
      addCard={addCard}
      isCardInMyDeck={isCardInMyDeck}
    ></OtherDecksCards>
  );

  return (
    <div className="deck-switcher">
      <div className="deck-switcher-buttons">
        <button onClick={() => setShowingMyDeck(false)}>Cards</button>
        <button onClick={() => setShowingMyDeck(true)}>My Deck</button>
      </div>
      {showingMyDeck ? myDeckCards : otherDeckCards}
    </div>
  );
};

export { DeckSwitcher };
