import './style.scss';

import React, { useState } from 'react';

import { DeckPreview } from '../deckPreview/index';
import { Search } from './search';

export const CardPanel = ({
  availableDecks,
  addDeck,
  isDeckChosen,
  isAdmin,
}) => {
  const [filterText, setFilterText] = useState('');
  const [showAnswers, setShowAnswers] = useState(true);
  const [showQuestions, setShowQuestions] = useState(true);

  return (
    <div className="card-panel">
      <Search
        filterText={filterText}
        showAnswers={showAnswers}
        showQuestions={showQuestions}
        setFilterText={setFilterText}
        setShowAnswers={setShowAnswers}
        setShowQuestions={setShowQuestions}
      />
      <div className="available-decks">
        {availableDecks.map(
          ({ id, author, type, title, description, cardCount, createdAt }) => {
            if (
              (filterText === '' ||
                title
                  .toLowerCase()
                  .trim()
                  .includes(filterText.toLowerCase().trim())) &&
              ((type === 'answers' && showAnswers) ||
                (type === 'questions' && showQuestions))
            )
              return (
                <DeckPreview
                  key={id}
                  id={id}
                  title={title}
                  type={type}
                  author={author}
                  description={description}
                  cardCount={cardCount}
                  createdAt={createdAt}
                  isInDeckPanel={true}
                  addDeck={addDeck}
                  isDeckChosen={isDeckChosen(id)}
                  isAdmin={isAdmin}
                />
              );
          },
        )}
      </div>
    </div>
  );
};
