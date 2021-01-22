import React, { useEffect, useRef } from 'react';

import { useEditOnClick } from '../customHooks/useEditOnClick';

const DeckName = ({ deck, isEditable, containerRef }) => {
  const inputRef = useRef();
  const [editing, deckName, setEditing, setDeckName] = useEditOnClick(
    false,
    deck.name,
    containerRef,
    inputRef,
  );

  useEffect(() => {
    if (!editing && deckName !== deck.name) {
      const trimmedDeckName = deckName.trim();
      if (trimmedDeckName === '') {
        setDeckName(deck.name); //If the user removed all text from deck name, discard changes
      } else {
        setDeckName(trimmedDeckName);
        console.log(
          `Changing deck's "${deck.id}" name to "${trimmedDeckName}". Send this to server`,
        );
      }
    }
  }, [editing]);

  const deckNameSpan = (
    <span
      className={`deck-name-span${isEditable ? ' editable' : ''}`}
      onClick={() => setEditing(isEditable)}
    >
      {deckName}
    </span>
  );
  const deckNameInput = (
    <input
      type="text"
      className="deck-name-input"
      ref={inputRef}
      value={deckName}
      onChange={(e) =>
        setDeckName(e.target.value.replace(/\s+/g, ' ').trimStart())
      }
    />
  );

  return editing ? deckNameInput : deckNameSpan;
};

export { DeckName };
