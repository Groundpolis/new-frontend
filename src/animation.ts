import { css, keyframes } from 'styled-components';

export const fade = keyframes`
from { opacity: 0; }
to { opacity: 1; }
`;

export const fadeUp = keyframes`
from {
  opacity: 0;
  transform: translateY(24px);
}
to {
  opacity: 1;
  transform: none;
}
`;

export const fadeLeft = keyframes`
from {
  opacity: 0;
  transform: translateX(24px);
}
to {
  opacity: 1;
  transform: none;
}
`;

const duration = '0.3s';
const bezier = 'cubic-bezier(0, .5, .5, 1)';

export const animationFade = css`
  animation: ${duration} ${bezier} ${fade};
`;

export const animationFadeUp = css`
  animation: ${duration} ${bezier} ${fadeUp};
`;

export const animationFadeLeft = css`
  animation: ${duration} ${bezier} ${fadeLeft};
`;
