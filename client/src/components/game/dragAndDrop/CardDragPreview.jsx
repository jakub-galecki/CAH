import './dragLayer.scss';

import React from 'react';

const CardDragPreview = ({ children }) => {
  return (
    <div className="answer-card card-drag-preview">
      <span>{children}</span>
    </div>
  );
};

export { CardDragPreview };
