import './card.scss';

import React from 'react';

const BackCard = ({ children }) => {
  return (
    <div className="card-wrapper">
      <div className="card-preview card-preview-back card">
        <div className="card-border">{children}</div>
      </div>
    </div>
  );
};

export { BackCard };
