import { Delete, EditTwo } from '@icon-park/react';
import React, { useRef } from 'react';

import { DeckName } from './DeckName';

const DeckEntry = ({
  deck,
  chosen,
  toggleDeckVisiblity,
  editable,
  isDeckCurrentlyEdited,
  editDeck,
  removeDeck,
}) => {
  const containerRef = useRef();

  let editButton = '';
  if (editable) {
    editButton = (
      <button
        className={`deck-entry-button${
          isDeckCurrentlyEdited ? ' disabled' : ''
        }`}
        disabled={isDeckCurrentlyEdited}
        onClick={() => editDeck(deck.id)}
      >
        <EditTwo
          className="deck-entry-button-icon"
          theme="filled"
          strokeWidth={3}
        />
      </button>
    );
  }

  let removeButton = '';
  if (editable) {
    removeButton = (
      <button
        className={`deck-entry-button${
          isDeckCurrentlyEdited ? ' disabled' : ''
        }`}
        disabled={isDeckCurrentlyEdited}
        onClick={() => removeDeck(deck.id)}
      >
        <Delete
          className="deck-entry-button-icon"
          theme="filled"
          strokeWidth={3}
        />
      </button>
    );
  }

  return (
    <li
      ref={containerRef}
      className={`deck-entry${editable ? ' editable' : ''}`}
    >
      <div className="checkbox-name-wrapper">
        <input
          className="deck-entry-checkbox"
          type="checkbox"
          checked={chosen}
          onChange={() => toggleDeckVisiblity(deck.id)}
        />
        <DeckName
          deck={deck}
          isEditable={editable}
          containerRef={containerRef}
        />
      </div>
      <div>
        {editButton}
        {removeButton}
      </div>
    </li>
  );
};

export { DeckEntry };
