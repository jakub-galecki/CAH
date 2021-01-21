import './editableCard.scss';

import { Close } from '@icon-park/react';
import { React, useEffect, useRef } from 'react';

import { useEditOnClick } from '../customHooks/useEditOnClick';

const EditableCard = ({
  children,
  id,
  isPlaceholder,
  addCard,
  updateCard,
  removeCard,
}) => {
  const containerRef = useRef();
  const inputRef = useRef();
  const [editing, content, setEditing, setContent] = useEditOnClick(
    false,
    children,
    containerRef,
    inputRef,
  );

  useEffect(() => {
    if (!editing && content !== children) {
      const trimmedContent = content.trim();
      if (trimmedContent === '') {
        setContent(children); //If the user removed all text from card, discard changes
      } else {
        setContent(trimmedContent);
        if (isPlaceholder) {
          addCard(content);
          setContent('');
        } else {
          updateCard(id, content);
        }
      }
    }
  }, [editing]);

  let card = (
    <span className="editable-card-content">
      {isPlaceholder ? 'Type here to create a new card' : content}
    </span>
  );
  if (editing) {
    card = (
      <textarea
        ref={inputRef}
        className="editable-card-input"
        value={content}
        onChange={(e) =>
          setContent(e.target.value.replace(/\s+/g, ' ').trimStart())
        }
      />
    );
  }

  const removeCardButton = (
    <button
      className="card-in-deck-button remove-card-button"
      onClick={() => removeCard(id)}
    >
      <Close
        className="card-in-deck-button-icon"
        theme="filled"
        strokeWidth={3}
      />
    </button>
  );

  return (
    <div
      ref={containerRef}
      className={`card-in-deck${!editing ? ' not-in-edit' : ''}`}
      onClick={() => setEditing(true)}
    >
      {card}
      {!isPlaceholder && !editing ? removeCardButton : ''}
    </div>
  );
};

export { EditableCard };
