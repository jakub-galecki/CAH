import './cardReverse.scss';

import React from 'react';

const CardReverse = ({ color, rightOffset, bottomOffset, text }) => {
  return (
    <div
      className={'card-reverse ' + color}
      style={{ right: rightOffset, bottom: bottomOffset }}
    >
      <span>{text}</span>
    </div>
  );
};

export { CardReverse };
