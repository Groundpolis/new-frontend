import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';

export const StyledButton = styled.button`
display: flex;
color: var();
width: 50px;
align-items: center;
justify-content: center;
border-radius: var(--radius);
&:hover {
  background: var(--hover);
}
&.active {
  background: var(--hover);
}
`;

export default function ActionBarButton(p: HTMLAttributes<HTMLButtonElement>) {
  return (
    <StyledButton {...p} className={`item clickable ${p.className ?? ''}`}>
      {p.children}
    </StyledButton>
  );
}
