import './style.scss';

import { Poker } from '@icon-park/react';
import React from 'react';

export const Search = ({
  filterText,
  showAnswers,
  showQuestions,
  setFilterText,
  setShowAnswers,
  setShowQuestions,
}) => {
  return (
    <div className="search-wrapper">
      <input
        className="search"
        placeholder="Search for decks"
        type="search"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value.trimStart())}
      ></input>
      <button
        className={`filter-button white${!showAnswers ? ' not-active' : ''}`}
        onClick={() => setShowAnswers(!showAnswers)}
      >
        <Poker theme="outline" strokeWidth={3} />
      </button>
      <button
        className={`filter-button black${!showQuestions ? ' not-active' : ''}`}
        onClick={() => setShowQuestions(!showQuestions)}
      >
        <Poker theme="outline" strokeWidth={3} />
      </button>
    </div>
  );
};
