import "./tile.scss";

import { User } from '@icon-park/react';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { useConnection } from '../../contexts/connection';
import { useRoom } from '../../contexts/room';

const NOTIMPLEMENTED = <span style={{color: 'red'}}>NOT IMPLEMENTED</span>;

const Tile = ({ roomInfo }) => {
  const { rpc } = useConnection();
  const { push } = useHistory();
  const { setRoomId } = useRoom();

  const handleJoin = async (id) => {
    try {
      const result = await rpc.send('room.join', {
        roomId: id,
      }, false);
      setRoomId(result);
      push('/room');
    } catch (e) {
      console.error(e);
    }
  }

  return(
	<div className='xd'>	
	{roomInfo.map( room => <div key={room._id} className="tile">
	  <div className="tileData">NAME: {NOTIMPLEMENTED} </div>
      <div className="tileData">OWNER: {room.owner}</div>
      <div className="tileData">PLAYERS: {room.users.length} <User className="tileIcon"/></div>
	  <div className="tileJoin" onClick={() => handleJoin(room._id)}><span className="tileLink">JOIN</span></div>
	</div>)}
	</div>
);
};
export { Tile };
