import './index.scss';

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Menu } from '../../components/roomList/menu';
import { Sort } from '../../components/roomList/search';
import { Tile } from '../../components/roomList/tile';
import { useConnection } from '../../contexts/connection';
import { useRoom } from '../../contexts/room';
import { toastError, toastSuccess } from '../../utils/toastify/index';

const RoomList = () => {
  const [localRooms, setLocalRooms] = useState([]);
  // @todo: create room in menu
  const [roomName, setRoomName] = useState('');
  const { rpc } = useConnection();
  const { push } = useHistory();
  const { setRoomId } = useRoom();

  useEffect(async () => {
    try {
      const rooms = await rpc.send('room.getRooms', {}, false);
      setLocalRooms(rooms);
    } catch (e) {
      console.warn(e);
    }
  }, []);

  // Create new room
  const handleClick = async () => {
    try {
      const roomData = await rpc.send('room.initRoom', {name: roomName}, false);
      setRoomId(roomData.roomId);

      toastSuccess('User entered the lobby');
      push('/room');
    } catch (err) {
      console.log(err);
      toastError('xd');
    }
  };

  // @todo: create room in menu
  return (
    <div className="roomList">
      <div className="row">
        <div className="column1">
          <Menu />
        </div>
        <div className="column2">
          {/* !TEMP: faster to handle it in top view for now */}
          <button onClick={handleClick}>Create room</button>
          <input value={roomName} onChange={(e) => setRoomName(e.target.value)}></input>
          {/* !TEMP: faster to handle it in top view for now */}
          <Sort />
          <Tile roomInfo={localRooms} />
        </div>
        <div className="column3"></div>
      </div>
    </div>
  );
};

export { RoomList };
