import './tile.scss';

import { User } from '@icon-park/react';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { useConnection } from '../../contexts/connection';

const Tile = ({ roomInfo }) => {
  const { rpc } = useConnection();

  const handleJoin = async roomId => {
    rpc.send('room.join', { roomId }, false);
  };

  return (
    <div className="xd">
      {roomInfo.map(room => (
        <div key={room._id} className="tile">
          <div className="tileData">NAME: {room.name} </div>
          <div className="tileData">OWNER: {room.owner.username}</div>
          <div className="tileData">
            PLAYERS: {room.users.length} <User className="tileIcon" />
          </div>
          <div className="tileJoin" onClick={() => handleJoin(room._id)}>
            <span className="tileLink">JOIN</span>
          </div>
        </div>
      ))}
    </div>
  );
};
export { Tile };
