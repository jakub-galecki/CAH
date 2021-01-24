import './rules.scss';

import { Close } from '@icon-park/react';
import React from 'react';

const Popup = (props) => {
  return (
    <div className="popup-box">
      <div className="box">
        <b>GAME RULES</b>
        <div className="textRules">
          <p>
            Before starting the game, host can personalize game. When the game
            starts, each player get ten white cards. One of the players begins
            as the Card Czar and gets a black card.
          </p>
          <p>
            Players have 30 seconds to fill in gaps by drag and drop one white
            card to the table, cards are upside down, so other players
            can&apos;t see them. When time is up the Card Czar and all players
            can read answers. Finally, the Card Czar picks the funniest play,
            and whoever submitted it gets one point.
          </p>
          <p>
            After the round, a new player becomes the Card Czar and everyone get
            back up to ten white cards.
          </p>
        </div>

        <div className="text close" onClick={props.handleClose}>
          <Close/>
        </div>
        {props.content}
      </div>
    </div>
  );
};

export { Popup };
