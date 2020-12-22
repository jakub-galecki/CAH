import './style.scss';

import React from 'react';
const Container = ({ children }) => {
  return <main className="content-container">{children}</main>;
};

export { Container };
