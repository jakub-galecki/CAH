import './card.scss';

import React from 'react';

const BackCard = ({ children }) => {
  return (
    <div className="card-wrapper">
      <div className="card-preview card-preview-back card">{children}</div>
    </div>
  );
};

export { BackCard };
