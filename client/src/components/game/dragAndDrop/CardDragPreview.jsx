import './dragLayer.scss';

import React from 'react';

const CardDragPreview = ({ children }) => {
  return (
    <div className="answer-card">
      <span>{children}</span>
    </div>
  );
};

export { CardDragPreview };
