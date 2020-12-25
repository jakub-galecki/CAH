import './answerCard.scss';

import React from 'react';

const AnswerCard = ({ children }) => (
  <div className="answer-card">
    <span>{children}</span>
  </div>
);

export { AnswerCard };
