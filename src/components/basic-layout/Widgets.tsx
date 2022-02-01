import React from 'react';
import { FaPlus } from 'react-icons/fa';
import styled from 'styled-components';
import Calendar from '../widgets/Calendar';

export default function Widgets() {
  return (
    <div className="vstack">
      <Calendar />
      <button className="btn flat text-primary">
        <FaPlus className="mr-2"/> ウィジェットを編集
      </button>
    </div>
  );
}
