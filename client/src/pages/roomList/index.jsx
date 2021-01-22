
import "./index.scss";

import React from 'react';

import { Menu } from '../../components/roomList/menu';
import { Sort } from '../../components/roomList/search';
import { Tile } from '../../components/roomList/tile';
import { roomsData } from './fakeData'

const RoomList = () => (
  <div className="roomList">
      <div className="row">
        <div className="column1"><Menu/></div>
        <div className="column2">
          <Sort/>
          <Tile roomInfo = {roomsData}/>
        </div>
      </div>
  </div>
);

export { RoomList };