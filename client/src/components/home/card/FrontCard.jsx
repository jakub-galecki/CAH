import './card.scss';

import React from 'react';

const FrontCard = ({ handleClick, children }) => {
  return (
    <div className="card-wrapper front">
      <div className="card-preview card" onClick={handleClick}>
        <div className="card-border">{children}</div>
      </div>
    </div>
  );
};

export { FrontCard };
