import styled from 'styled-components';

export const Sky = styled.div`
height: calc(100vh - 32px);
white-space: nowrap;
overflow: hidden;
position: relative;
> .stars {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: -10000;
  pointer-events: none;
  > canvas {
    position: absolute;
    opacity: 0.2;
    inset: 0;
    pointer-events: none;
  }
}
`;
