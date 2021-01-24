import './index.scss';

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Menu } from '../../components/roomList/menu';
import { Sort } from '../../components/roomList/search';
import { Tile } from '../../components/roomList/tile';
import { useAuth } from '../../contexts/auth';
import { useConnection } from '../../contexts/connection';
import { useRoom } from '../../contexts/room';

const RoomList = () => {
  const [localRooms, setLocalRooms] = useState([]);
  // @todo: create room in menu
  const { userId } = useAuth();
  const { rpc, ws } = useConnection();
  const { push } = useHistory();
  const { setRoomId } = useRoom();

  // @todo: rewrite ws handling logic inside specialized module
  ws.onmessage = (msg) => {
    console.log(msg);
    const { result } = JSON.parse(msg.data);
    if (!result) return; // @todo: error handling
    switch (result.method) {
      case 'room.initRoom':
        if (result.user === userId) {
          setRoomId(result.data._id);
          push('/room');
        } else {
          setLocalRooms([result.data, ...localRooms]);
        }
        break;
      case 'room.join':
        if (result.user._id === userId) {
          setRoomId(result.data._id);
          push('/room');
          // toastSuccess('User entered the lobby');
        } else {
          const roomsWithoutUpdated = localRooms.filter(
            (r) => r._id !== result.data._id,
          );
          setLocalRooms([result.data, ...roomsWithoutUpdated]);
        }
        break;
      default:
        console.log(result);
    }
  };

  // Initial rooms data
  useEffect(async () => {
    try {
      const rooms = await rpc.send('room.getRooms', {}, false);
      setLocalRooms(rooms);

      const { roomId } = await rpc.send('room.getMyRoom', {}, false);
      setRoomId(roomId);
    } catch (e) {
      console.warn(e);
    }
  }, []);

  // @todo: create room in menu
  return (
    <div className="roomList">
      <div className="row">
        <div className="column1">
          <Menu />
        </div>
        <div className="column2">
          <Sort />
          <Tile roomInfo={localRooms} />
        </div>
        <div className="column3" />
      </div>
    </div>
  );
};

export { RoomList };
