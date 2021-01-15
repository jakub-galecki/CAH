import './style.scss';

import React from 'react';

import { ChosenDecks } from './chosenDecks/ChosenDecks';
import { RoomLink } from './roomLink/RoomLink';
import { RoomSettings } from './roomSettings/RoomSettings';

export const Overview = ({ chosenDecks, removeDeck, isDeckChosen }) => {
  return (
    <div className="overview">
      <RoomLink>{'www.example.com'}</RoomLink>
      <RoomSettings
        isAdmin={true}
        defaultIsPrivate={false}
        defaultPlayerLimit={10}
        defaultPointLimit={20}
        defaultAnswerTime={30}
      />
      <ChosenDecks
        chosenDecks={chosenDecks}
        removeDeck={removeDeck}
        isDeckChosen={isDeckChosen}
      />
    </div>
  );
};
