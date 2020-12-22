import './card.scss';

import React from 'react';
import ReactCardFlip from 'react-card-flip';

const CardWrapper = ({ side, activeCard, children }) => {
  return (
    <div
      className={`react-card-flip-wrapper react-card-flip-wrapper-${side} ${
        side === activeCard ? 'active' : ''
      }`}
    >
      <ReactCardFlip isFlipped={activeCard === side} flipDirection="horizontal">
        {children}
      </ReactCardFlip>
    </div>
  );
};

export { CardWrapper };
