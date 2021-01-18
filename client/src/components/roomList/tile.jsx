import "./tile.scss";

import { User } from '@icon-park/react';
import React from 'react';
import { Link } from 'react-router-dom';

const NOTIMPLEMENTED = <span style={{color: 'red'}}>NOT IMPLEMENTED</span>;

const Tile = ({ roomInfo }) => {
	return(
	<div className='xd'>	
	{roomInfo.map( room => <div key={room.owner.user._id} className="tile">
	  <div className="tileData">NAME: {NOTIMPLEMENTED} </div>
      <div className="tileData">OWNER: {room.owner.user.username}</div>
      <div className="tileData">PLAYERS: {room.users.length} <User className="tileIcon"/></div>
	  <div className="tileJoin"><Link to="/room" className="tileLink">JOIN</Link></div>
	</div>)}
	</div>
);
};
export { Tile };
