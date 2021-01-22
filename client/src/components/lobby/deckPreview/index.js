import './style.scss';

import { Close, Poker } from '@icon-park/react';
import React from 'react';

export const DeckPreview = ({
  id,
  author,
  type,
  title,
  description,
  cardCount,
  createdAt,
  isInDeckPanel,
  addDeck,
  removeDeck,
  isDeckChosen,
  isAdmin,
}) => {
  const date = `${createdAt.getDate()} ${createdAt.getMonth()} ${createdAt.getFullYear()}`;
  let rightUpElem = <p>{date}</p>;
  if (!isInDeckPanel && isAdmin) {
    rightUpElem = (
      <button
        className="remove-deck-button"
        onClick={() => removeDeck(id, true)}
      >
        <Close
          className="remove-deck-button-icon"
          theme="filled"
          strokeWidth={3}
        />
      </button>
    );
  }
  return (
    <div
      className={`deck-preview${isDeckChosen ? ' chosen' : ' not-chosen'}${
        type === 'questions' ? ' black' : ' white'
      }${isAdmin ? ' admin' : ''}`}
      onClick={() =>
        isInDeckPanel && !isDeckChosen && isAdmin ? addDeck(id, true) : ''
      }
    >
      <div className="left-up">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <div className="right-up">{rightUpElem}</div>
      <div className="left-bottom">
        <p>{author}</p>
      </div>
      <div className="right-bottom">
        <span>
          {`${cardCount} `}
          <Poker theme="outline" strokeWidth={3} />
        </span>
      </div>
    </div>
  );
};
