import "./index.scss";

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Menu } from '../../components/roomList/menu';
import { Sort } from '../../components/roomList/search';
import { Tile } from '../../components/roomList/tile';
import { useConnection } from '../../contexts/connection';
import { toastError, toastSuccess } from '../../utils/toastify/index';
// import { roomsData } from './fakeData'

const RoomList = () => {
  const [localRooms, setLocalRooms] = useState([]);
  const { rpc, ws } = useConnection();
  const { push } = useHistory();

  if(ws) {
    console.log('Ws init roomlist')
    ws.onmessage = (data) => {
      console.log(data) 
    }
  }

  useEffect(async () => {
    if(!rpc) return;
    try {
      const rooms = await rpc.send('room.getRooms', {}, false);
      setLocalRooms(rooms)
    } catch (e){
      console.console.warn(e);
    }
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
  <div className="roomList">
      <div className="row">
        <div className="column1"><Menu/></div>
        <div className="column2">
          <button onClick={handleClick}>Create room</button> {/* temp */}
          <Sort/>
          <Tile roomInfo = {localRooms}/>
        </div>
        <div className="column3"></div>
      </div>
  </div>
)};

export { RoomList };