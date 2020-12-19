import './card.scss';

import React from 'react';

const FrontCard = ({ handleClick, children }) => {
  return (
    <div className="card-wrapper">
      <div className="card-preview card" onClick={handleClick}>
        {children}
      </div>
    </div>
  );
};

export { FrontCard };
