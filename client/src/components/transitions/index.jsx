import './pageTransitions.scss';

import React from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

export const PageTransitions = ({ keyValue, children }) => {
  return (
    <SwitchTransition component={null}>
      <CSSTransition key={keyValue} classNames="fade" timeout={300}>
        {children}
      </CSSTransition>
    </SwitchTransition>
  );
};
2;
