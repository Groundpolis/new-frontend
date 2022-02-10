import React from 'react';
import { FaFilter } from 'react-icons/fa';
import ActionBar from '../components/common/action-bar/ActionBar';
import ActionBarButton from '../components/common/action-bar/ActionBarButton';
import Notifications from '../components/common/NotificationListView';

export default function NotificationsPage() {
  return (
    <>
      <ActionBar>
        <h1>通知</h1>
        <ActionBarButton className="ml-auto"><FaFilter /></ActionBarButton>
      </ActionBar>
      <div className="container">
        <div className="bg-panel rounded">
          <Notifications />          
        </div>
      </div>
    </>
  );
}
