import React from 'react';
import Calendar from '../widgets/Calendar';
import Notification from '../widgets/Notification';

export default function Widgets() {
  return (
    <div className="vstack">
      <Calendar />
      <Notification />
      <button className="btn flat" disabled>
        <i className="fas fa-pencil-alt mr-2"/> ウィジェットを編集
      </button>
    </div>
  );
}
