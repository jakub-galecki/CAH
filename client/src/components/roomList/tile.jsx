import './tile.scss';

import { User } from '@icon-park/react';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../contexts/auth';
import { useConnection } from '../../contexts/connection';
import { useRoom } from '../../contexts/room';

const Tile = ({ roomInfo }) => {
  const { ws, rpc } = useConnection();
  const { userId } = useAuth();
  const { push } = useHistory();
  const { setRoomId } = useRoom();

  ws.onmessage = (msg) => {
    const { result } = JSON.parse(msg.data);
    if (result.method === 'room.join') {
      if (result.user === userId) {
        setRoomId(result.data._id);
        push('/room');
      }
    }
  };

  const handleJoin = async (id) => {
    try {
      rpc.send(
        'room.join',
        {
          roomId: id,
        },
        false,
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="xd">
      {roomInfo.map((room) => (
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
