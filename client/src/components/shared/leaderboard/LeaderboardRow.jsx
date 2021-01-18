import { Correct, CrownThree, Loading, Poker } from '@icon-park/react';
import React from 'react';

const LeaderboardRow = ({ state, nick, points }) => {
  let icon;

  switch (state) {
    case 'black':
      icon = <Poker className="leaderboard-state" theme="filled" />;
      break;
    case 'chosen':
      icon = (
        <Correct className="leaderboard-state" theme="filled" strokeWidth={1} />
      );
      break;
    case 'choosing':
      icon = (
        <Loading className="leaderboard-state" theme="filled" spin="true" />
      );
      break;
    case 'admin':
      icon = (
        <CrownThree
          className="leaderboard-state"
          theme="outline"
          strokeWidth={3}
        />
      );
      break;
    default:
      icon = <span className="leaderboard-state"></span>;
  }

  return (
    <div className="leaderboard-row">
      {icon}
      <span className="leaderboard-nick">{nick}</span>
      {points ? <span className="leaderboard-points">{points}</span> : ''}
    </div>
  );
};

export { LeaderboardRow };
