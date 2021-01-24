import './new_room.scss';

import { PlusCross } from '@icon-park/react';
import React, { useState } from 'react';

import { useConnection } from '../../contexts/connection';
const Create = () => {

  const [roomName, setRoomName] = useState('');
  const { rpc } = useConnection();

  // Create new room
  const handleClick = () => {
    rpc.send('room.initRoom', { name: roomName }, false);
  };

  
 return (
    <div className="menuLink">
        <div onClick={handleClick}>        
        <PlusCross className="menuIcon"/>
        <br />
        Create room </div>
        <input
            value={roomName}
            placeholder="Room's name"
            onChange={(e) => setRoomName(e.target.value)}
          />
    </div>
  );
};

export { Create };