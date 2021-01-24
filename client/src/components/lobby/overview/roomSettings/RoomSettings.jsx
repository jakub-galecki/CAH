import './roomSettings.scss';

import React from 'react';

import { useConnection } from '../../../../contexts/connection';
import { useRoom } from '../../../../contexts/room';
import { CheckboxSetting } from './CheckboxSetting';
import { SelectNumberSetting } from './SelectNumberSetting';

const RoomSettings = ({
  isAdmin,
  defaultIsPrivate,
  defaultPlayerLimit,
  defaultPointLimit,
  defaultAnswerTime,
}) => {
  const { roomId } = useRoom();
  const { rpc } = useConnection();
  const handleStart = () => {
    rpc.send('room.start', { roomId }, false);
  };

  return (
    <div className="room-settings">
      <h1>Admin panel</h1>
      <form>
        <CheckboxSetting
          title="Private"
          defaultChecked={defaultIsPrivate}
          isDisabled={!isAdmin}
        />
        <SelectNumberSetting
          title="Player limit"
          defaultValue={defaultPlayerLimit}
          isDisabled={!isAdmin}
          min={3}
          step={1}
          max={10}
        />
        <SelectNumberSetting
          title="Point limit"
          defaultValue={defaultPointLimit}
          isDisabled={!isAdmin}
          min={10}
          step={10}
          max={100}
        />
        <SelectNumberSetting
          title="Seconds for answer"
          defaultValue={defaultAnswerTime}
          isDisabled={!isAdmin}
          min={15}
          step={15}
          max={60}
        />
      </form>
      <span className="countdown-span">Countdown: 4</span>
      <button
        onClick={() => handleStart()}
        className={`start-game-button${!isAdmin ? ' disabled' : ''}`}
      >
        Start game
      </button>
    </div>
  );
};

export { RoomSettings };
