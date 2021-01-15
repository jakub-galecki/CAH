import React from 'react';

import { useRpc } from '../../contexts/rpc';
import { toastError, toastSuccess } from '../../utils/toastify/index';

// ! WIP: basic stage is written only to test features
const RoomList = () => {
  const { rpc } = useRpc();

  const handleClick = async () => {
    try {
      await rpc.send('room.initRoom', {}, false);
      toastSuccess('User entered the lobby');
    } catch({err}) {
      toastError(err);
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
