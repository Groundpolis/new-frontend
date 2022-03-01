import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';

const Container = styled.header`
position: sticky;
top: 0;
display: flex;
height: 50px;
overflow: hidden;
z-index: 11;
> h1 {
  margin: auto 0;
  font-size: 1.2em;
  margin-left: var(--margin);
}
> .item {
  height: 50px;
  margin: 0;
}
`;

export default function ActionBar(p: HTMLAttributes<HTMLDivElement>) {
  return (
    <Container {...p} className={`bg-panel rounded-b shadow-2 ${p.className ?? ''}`}>
      {p.children}
    </Container>
  );
}
