import React from 'react';
import { FaPlus } from 'react-icons/fa';
import styled from 'styled-components';
import Calendar from '../widgets/Calendar';

const Container = styled.div`
  width: 300px;
`;

export default function Widgets() {
  return (
    <Container className="vstack">
      <Calendar />
      <button className="btn flat text-primary">
        <FaPlus className="mr-2"/> ウィジェットを追加
      </button>
    </Container>
  );
}
