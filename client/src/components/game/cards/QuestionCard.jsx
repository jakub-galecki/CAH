import './questionCard.scss';

import React from 'react';

const QuestionCard = ({ text }) => (
  <div className="question-card">
    <span>{text}</span>
  </div>
);

export { QuestionCard };
