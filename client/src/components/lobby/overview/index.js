import './style.scss';

import React from 'react';

import { RoomLink } from './roomLink/RoomLink';
export const Overview = () => {
  return (
    <div className="overview">
      <RoomLink>{'www.example.com'}</RoomLink>
    </div>
  );
};
