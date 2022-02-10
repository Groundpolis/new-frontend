import { UserDetailed } from 'misskey-js/built/entities';
import React from 'react';
import styled, { keyframes } from 'styled-components';

const earwiggleleft = keyframes`
	from { transform: rotate(37.6deg) skew(30deg); }
	25% { transform: rotate(10deg) skew(30deg); }
	50% { transform: rotate(20deg) skew(30deg); }
	75% { transform: rotate(0deg) skew(30deg); }
	to { transform: rotate(37.6deg) skew(30deg); }
`;
const earwiggleright = keyframes`
	from { transform: rotate(-37.6deg) skew(-30deg); }
	30% { transform: rotate(-10deg) skew(-30deg); }
	55% { transform: rotate(-20deg) skew(-30deg); }
	75% { transform: rotate(0deg) skew(-30deg); }
	to { transform: rotate(-37.6deg) skew(-30deg); }
`;

const AvatarWrapper = styled.div<{size: string, inline?: boolean}>`
display: ${p => p.inline ? 'inline-block' : 'block'};
position: relative;
width: ${props => props.size};
height: ${props => props.size};
background-size: cover;
&.cat {
  &:before, &:after {
      background: #df548f;
      border: solid 4px currentColor;
      box-sizing: border-box;
      content: '';
      display: inline-block;
      height: 50%;
      width: 50%;
  }
  &:before {
      border-radius: 0 75% 75%;
      transform: rotate(37.5deg) skew(30deg);
  }
  &:after {
      border-radius: 75% 0 75% 75%;
      transform: rotate(-37.5deg) skew(-30deg);
  }
  &.animated:hover {
      &:before {
          animation: ${earwiggleleft} 1s infinite;
      }
      &:after {
          animation: ${earwiggleright} 1s infinite;
      }
  }
}
`;

export type AvatarProp = {
    user: UserDetailed,
    size?: number | string,
    inline?: boolean,
};

export default function Avatar(prop: AvatarProp) {
  const size = !prop.size ? '64px' : typeof prop.size === 'string' ? prop.size : prop.size + 'px';
  return (
    <AvatarWrapper size={size} inline={prop.inline} className={prop.user.isCat ? 'animated cat' : ''}>
      <img src={prop.user.avatarUrl} className="circle" style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 10,
      }} />
    </AvatarWrapper>
  );
}
