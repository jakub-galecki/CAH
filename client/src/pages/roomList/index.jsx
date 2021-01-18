import "./index.scss";

import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Menu } from '../../components/roomList/menu';
import { Sort } from '../../components/roomList/search';
import { Tile } from '../../components/roomList/tile';
import { useConnection } from '../../contexts/connection';
import { toastError, toastSuccess } from '../../utils/toastify/index';
import { roomsData } from './fakeData'

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
  <div className="roomList">
      <div className="row">
        <div className="column1"><Menu/></div>
        <div className="column2">
          <button onClick={handleClick}>Create room</button> {/* temp */}
          <Sort/>
          <Tile roomInfo = {roomsData}/>
        </div>
        <div className="column3"></div>
      </div>
  </div>
)};

export { RoomList };