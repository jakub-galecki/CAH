import React, { createContext, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const RoomContext = createContext({});

export const RoomProvider = ({ children }) => {
  const [roomId, _setRoomId] = useState(null);
  const { push } = useHistory();
  useEffect(() => {
    const currentRoom = localStorage.getItem('roomId');
    if (currentRoom) _setRoomId(currentRoom);
  }, []);

  const setRoomId = (room) => {
    localStorage.setItem('roomId', room);
    _setRoomId(room);
    push('/room');
  };

  return (
    <RoomContext.Provider value={{ roomId, setRoomId }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => {
  return useContext(RoomContext);
};
