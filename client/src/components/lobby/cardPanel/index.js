import './style.scss';

import React from 'react';

import { DeckPreview } from './deckPreview/index';
import { generateDecks } from './fakeDecks';
import { Search } from './search';

export const CardPanel = () => {
  const decks = generateDecks(12);

  return (
    <div className="card-panel">
      <Search />
      {decks.map(({ id, author, title, description, createdAt }) => (
        <DeckPreview
          key={id}
          title={title}
          author={author}
          description={description}
          createdAt={createdAt}
        />
      ))}
    </div>
  );
};
