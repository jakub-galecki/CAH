import './style.scss';

import React from 'react';

import { RoomLink } from './roomLink/RoomLink';
import { RoomSettings } from './roomSettings/RoomSettings';

export const Overview = () => {
  return (
    <div className="overview">
      <RoomLink>{'www.example.com'}</RoomLink>
      <RoomSettings
        isAdmin={true}
        defaultIsPrivate={false}
        defaultPlayerLimit={10}
        defaultPointLimit={20}
        defaultAnswerTime={30}
      ></RoomSettings>
    </div>
  );
};
