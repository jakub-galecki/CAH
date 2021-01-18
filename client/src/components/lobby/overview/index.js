import './style.scss';

import React from 'react';

import { ChosenDecks } from './chosenDecks/ChosenDecks';
import { RoomLink } from './roomLink/RoomLink';
import { RoomSettings } from './roomSettings/RoomSettings';

export const Overview = ({
  chosenDecks,
  removeDeck,
  isDeckChosen,
  isAdmin,
}) => {
  return (
    <div className="overview">
      <RoomLink>{'www.example.com'}</RoomLink>
      <ChosenDecks
        chosenDecks={chosenDecks}
        removeDeck={removeDeck}
        isDeckChosen={isDeckChosen}
        isAdmin={isAdmin}
      />
      <RoomSettings
        isAdmin={isAdmin}
        defaultIsPrivate={false}
        defaultPlayerLimit={10}
        defaultPointLimit={20}
        defaultAnswerTime={30}
      />
    </div>
  );
};
