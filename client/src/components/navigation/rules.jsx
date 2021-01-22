import './rules.scss';

import React from "react";
 
const Popup = props => {
  return (
    <div className="popup-box">
      <div className="box">
      <b>GAME RULES</b>
        <div className = "textRules">Before starting the game, host can personalize game.
          When the game starts, each player get ten white cards. One of the players begins as the Card Czar
and gets a black card. Players have 30 seconds to fill in gaps by drag and drop one white card to the table, cards are upside down, so other palyers cant see them.
When time is up the Card Czar read answers and choose the funniest one. Then all players can read answers. Finally, the Card
Czar picks the funniest play, and whoever submitted it gets one point. After the round, a new player becomes the Card Czar and everyone
get back up to ten white cards.</div>
        <span className="text" onClick={props.handleClose}>X</span>
        {props.content}
      </div>
    </div>
  );
};
 
export { Popup };