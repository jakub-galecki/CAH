import './nonEditableCard.scss';

import { AddOne } from '@icon-park/react';
import React from 'react';

const NonEditableCard = ({ children, addCard, isCardInMyDeck }) => {
  const isDisabled = isCardInMyDeck(children);

  return (
    <div className="card-in-deck">
      <span>{children}</span>
      <button
        className={`card-in-deck-button add-card-to-deck-button${
          isDisabled ? ' disabled' : ''
        }`}
        disabled={isDisabled}
        onClick={() => addCard(children)}
      >
        <AddOne
          className="card-in-deck-button-icon"
          theme="filled"
          strokeWidth={3}
        />
      </button>
    </div>
  );
};

export { NonEditableCard };
