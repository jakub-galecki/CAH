import './editableCard.scss';

import { Close } from '@icon-park/react';
import { React, useEffect, useRef, useState } from 'react';

const EditableCard = ({
  children,
  id,
  isPlaceholder,
  addCard,
  updateCard,
  removeCard,
}) => {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(children);
  const containerRef = useRef();
  const inputRef = useRef();

  const handleClickOutside = (e) => {
    if (containerRef.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setEditing(false);
  };

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

    if (editing) {
      document.addEventListener('mousedown', handleClickOutside);
      inputRef.current.focus();
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
      ></textarea>
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
