import React, { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import styled from 'styled-components';
import NotificationListView from '../common/NotificationListView';

const Scroller = styled.div`
height: 500px;
overflow: auto;
`;

export default function Notification() {
  return (
    <div className="card">
      <header><FaBell/> 通知</header>
      <Scroller>
        <NotificationListView slim/>
      </Scroller>
    </div>
  );
}
