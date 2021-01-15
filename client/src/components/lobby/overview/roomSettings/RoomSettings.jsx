import React from 'react';

import { CheckboxSetting } from './CheckboxSetting';
import { SelectNumberSetting } from './SelectNumberSetting';

const RoomSettings = ({
  isAdmin,
  defaultIsPrivate,
  defaultPlayerLimit,
  defaultPointLimit,
  defaultAnswerTime,
}) => {
  return (
    <div className="room-settings">
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
          title="Time to answer (seconds)"
          defaultValue={defaultAnswerTime}
          isDisabled={!isAdmin}
          min={15}
          step={15}
          max={60}
        />
      </form>
      <span>Countdown: 4</span>
      <button>Start game</button>
    </div>
  );
};

export { RoomSettings };
