import './leaderboard.scss';

import React from 'react';

import { LeaderboardRow } from './LeaderboardRow';

const Leaderboard = ({ playersInfo, isInGameplay }) => {
  console.log({ playersInfo });
  return (
    <div className="leaderboard">
      {playersInfo.map(({ id, state, nick, points, isAdmin }) => (
        <LeaderboardRow
          key={id}
          state={isInGameplay ? state : isAdmin ? 'admin' : ''}
          nick={nick}
          points={isInGameplay ? points : null}
        />
      ))}
    </div>
  );
};

export { Leaderboard };
