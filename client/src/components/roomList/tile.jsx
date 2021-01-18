import "./tile.scss";

import { User } from '@icon-park/react';
import React from 'react';
import { Link } from 'react-router-dom';

const Tile = ({ roomInfo }) => {
	return(
	<div className='xd'>	
	{roomInfo.map( _ => <div key={_.id} className="tile">
	  <div className="tileData">NAME: {_.name}  </div>
      <div className="tileData">DECKS: {_.decks}, {_.deckStd}</div>
      <div className="tileData">PLAYERS: {_.players} <User className="tileIcon"/></div>
	  <div className="tileJoin"><Link to="/room" className="tileLink">JOIN</Link></div>
	</div>)}
	</div>
);
};
export { Tile };
