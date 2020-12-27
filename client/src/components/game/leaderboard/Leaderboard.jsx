import './leaderboard.scss';

import React from 'react';

import { LeaderboardRow } from './LeaderboardRow';

const Leaderboard = ({ playersInfo }) => {
  return (
    <div className="leaderboard">
      {playersInfo.map(({ id, state, nick, points }) => (
        <LeaderboardRow
          key={id}
          state={state}
          nick={nick}
          points={points}
        ></LeaderboardRow>
      ))}
    </div>
  );
};

export { Leaderboard };
