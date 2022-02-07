import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import Calendar from '../widgets/Calendar';

export default function Widgets() {
  return (
    <div className="vstack">
      <Calendar />
      <button className="btn flat" disabled>
        <FaPencilAlt className="mr-2"/> ウィジェットを編集
      </button>
    </div>
  );
}
