import React from 'react';

import { DeckPreview } from '../../deckPreview/index';

const ChosenDecks = ({ chosenDecks, removeDeck, isDeckChosen }) => {
  return (
    <div>
      {chosenDecks.map(({ id, author, title, description, createdAt }) => (
        <DeckPreview
          key={id}
          id={id}
          author={author}
          title={title}
          description={description}
          createdAt={createdAt}
          isInDeckPanel={false}
          removeDeck={removeDeck}
          isDeckChosen={isDeckChosen}
        />
      ))}
    </div>
  );
};

export { ChosenDecks };
