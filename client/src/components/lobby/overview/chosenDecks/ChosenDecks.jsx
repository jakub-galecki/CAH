import './chosenDecks.scss';

import React from 'react';

import { DeckPreview } from '../../deckPreview/index';

const ChosenDecks = ({ chosenDecks, removeDeck, isDeckChosen }) => {
  return (
    <div className="chosen-decks">
      {chosenDecks.map(
        ({ id, author, type, title, description, createdAt }) => (
          <DeckPreview
            key={id}
            id={id}
            author={author}
            type={type}
            title={title}
            description={description}
            createdAt={createdAt}
            isInDeckPanel={false}
            removeDeck={removeDeck}
            isDeckChosen={isDeckChosen}
          />
        ),
      )}
    </div>
  );
};

export { ChosenDecks };
