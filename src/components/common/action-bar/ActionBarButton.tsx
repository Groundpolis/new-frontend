import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

export const StyledButton = styled.button`
display: flex;
color: var(--fg);
width: 50px;
align-items: center;
justify-content: center;
border-radius: var(--radius);
&:disabled {
  color: var(--dimmed);
}
&:not(:disabled):hover {
  background: var(--hover);
}
&:not(:disabled).active {
  background: var(--hover);
}
`;

export default function ActionBarButton(p: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <StyledButton {...p} className={`item clickable ${p.className ?? ''}`}>
      {p.children}
    </StyledButton>
  );
}
