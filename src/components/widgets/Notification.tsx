import React from 'react';
import styled from 'styled-components';
import NotificationListView from '../common/NotificationListView';

const Scroller = styled.div`
height: 500px;
overflow: auto;
`;

export default function Notification() {
  return (
    <div className="card">
      <header><i className="fas fa-bell" /> 通知</header>
      <Scroller>
        <NotificationListView slim/>
      </Scroller>
    </div>
  );
}
