import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useConnection } from '../../contexts/connection';
import { toastError, toastSuccess } from '../../utils/toastify/index';

// ! WIP: basic stage is written only to test features
const RoomList = () => {
  const { rpc, ws } = useConnection();
  const { push } = useHistory();

  if(ws) {
    console.log('Ws init roomlist')
    ws.onmessage = (data) => {
      console.log(data) 
    }
  }
  useEffect(async () => {
    try {
      const rooms = await rpc.send('room.getRooms', {}, false);
      console.log(rooms)
    } catch { /* empty */ }
  }, [])
  const handleClick = async () => {
    try {
      await rpc.send('room.initRoom', {}, false);
      toastSuccess('User entered the lobby');
      push('/room');
    } catch(err) {
      console.log(err)
      toastError('xd');
    }
  };

  return (
    <div className="room-list">
      <h1>RoomList</h1>
      <button onClick={handleClick}>Create Room</button>
    </div>
  );
};

export { RoomList };
