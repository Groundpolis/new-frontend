import React from 'react';
import { FaFilter } from 'react-icons/fa';
import ActionBar from '../components/common/action-bar/ActionBar';
import ActionBarButton from '../components/common/action-bar/ActionBarButton';

export default function NotificationsPage() {
  return (
    <>
      <ActionBar>
        <h1>通知</h1>
        <ActionBarButton className="ml-auto"><FaFilter /></ActionBarButton>
      </ActionBar>
      <div className="container">
        <p>TBD</p>
      </div>
    </>
  );
}
