import './chosenDecks.scss';

import { Poker } from '@icon-park/react';
import React from 'react';

import { DeckPreview } from '../../deckPreview/index';

const ChosenDecks = ({ chosenDecks, removeDeck, isDeckChosen }) => {
  const answerDecksCount = chosenDecks.reduce(
    (sum, deck) => (deck.type === 'answers' ? sum + deck.cardCount : sum),
    0,
  );
  const questionDecksCount = chosenDecks.reduce(
    (sum, deck) => (deck.type === 'questions' ? sum + deck.cardCount : sum),
    0,
  );

  return (
    <div className="chosen-decks-container">
      <h1>Chosen decks</h1>
      <div className="deck-count-container">
        <span className="deck-count white">
          <Poker theme="outline" strokeWidth={3} />
          {answerDecksCount}
        </span>
        <span className="deck-count black">
          <Poker theme="outline" strokeWidth={3} />
          {questionDecksCount}
        </span>
      </div>

      <div className="chosen-decks-grid">
        {chosenDecks.map(
          ({ id, author, type, title, description, cardCount, createdAt }) => (
            <DeckPreview
              key={id}
              id={id}
              author={author}
              type={type}
              title={title}
              description={description}
              cardCount={cardCount}
              createdAt={createdAt}
              isInDeckPanel={false}
              removeDeck={removeDeck}
              isDeckChosen={isDeckChosen}
            />
          ),
        )}
      </div>
    </div>
  );
};

export { ChosenDecks };
