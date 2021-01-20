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
      const roomData = await rpc.send('room.initRoom', {}, false);
      setRoomId(roomData.roomId);

      toastSuccess('User entered the lobby');
      push('/room');
    } catch (err) {
      console.log(err);
      toastError('xd');
    }
  };

  return (
    <div className="roomList">
      <div className="row">
        <div className="column1">
          <Menu />
        </div>
        <div className="column2">
          <button onClick={handleClick}>Create room</button> {/* temp */}
          <Sort />
          <Tile roomInfo={localRooms} />
        </div>
        <div className="column3"></div>
      </div>
    </div>
  );
};

export { RoomList };
