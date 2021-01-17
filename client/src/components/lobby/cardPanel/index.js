import './style.scss';

import React from 'react';

import { DeckPreview } from '../deckPreview/index';
import { Search } from './search';

export const CardPanel = ({ availableDecks, addDeck, isDeckChosen }) => {
  return (
    <div className="card-panel">
      <Search />
      {availableDecks.map(
        ({ id, author, type, title, description, createdAt }) => (
          <DeckPreview
            key={id}
            id={id}
            title={title}
            type={type}
            author={author}
            description={description}
            createdAt={createdAt}
            isInDeckPanel={true}
            addDeck={addDeck}
            isDeckChosen={isDeckChosen(id)}
          />
        ),
      )}
    </div>
  );
};
