import './style.scss';

import React from 'react';

import { CardPanel } from '../../components/lobby/cardPanel/index';
import { Overview } from '../../components/lobby/overview/index';
import { Team } from '../../components/lobby/team/index';

const Lobby = () => (
  <div className="lobby">
    <CardPanel />
    <Overview />
    <Team />
  </div>
);

export { Lobby };
