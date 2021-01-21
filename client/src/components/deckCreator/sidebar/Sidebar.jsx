import './sidebar.scss';

import { AddOne } from '@icon-park/react';
import React from 'react';

import { DeckEntry } from './DeckEntry';

const Sidebar = ({
  availableDecks,
  chosenDecks,
  myDecks,
  currentMyDeck,
  toggleDeckVisiblity,
  editDeck,
  removeDeck,
  newDeck,
}) => {
  return (
    <aside className="deck-creator-sidebar">
      <h2>Available decks</h2>
      <ul>
        {availableDecks.map(deck => (
          <DeckEntry
            key={deck.id}
            deck={deck}
            chosen={chosenDecks.some(chosenDeck => chosenDeck.id === deck.id)}
            toggleDeckVisiblity={toggleDeckVisiblity}
          />
        ))}
      </ul>
      <h2>My decks</h2>
      <ul>
        {myDecks.map(deck => (
          <DeckEntry
            key={deck.id}
            deck={deck}
            chosen={chosenDecks.some(chosenDeck => chosenDeck.id === deck.id)}
            toggleDeckVisiblity={toggleDeckVisiblity}
            editable={true}
            isDeckCurrentlyEdited={deck.id === currentMyDeck.id}
            editDeck={editDeck}
            removeDeck={removeDeck}
          />
        ))}
      </ul>
      <button
        className="deck-entry-button new-deck-button"
        onClick={() => newDeck()}
      >
        <AddOne
          className="deck-entry-button-icon new-deck-button-icon"
          theme="filled"
          strokeWidth={3}
        />
      </button>
    </aside>
  );
};

export { Sidebar };
