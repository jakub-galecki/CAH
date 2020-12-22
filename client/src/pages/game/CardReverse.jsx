import React from 'react';

const CardReverse = ({ color, rightOffset, bottomOffset }) => {
  return (
    <div
      className={'card-reverse ' + color}
      style={{ right: rightOffset, bottom: bottomOffset }}
    >
      <span>Cards Against Humanity</span>
    </div>
  );
};

export { CardReverse };
