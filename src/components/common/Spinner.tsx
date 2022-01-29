import React from 'react';
import styled, { keyframes } from 'styled-components';

const duration = 1.5;
const delay = 0.07;
const templateSize = '64px';
const templateColor = 'var(--primary)';

export type SpinnerProp = {
  size?: string | number,
  color?: string,
};

type SpinnerWrapperProp = {
  size?: string,
};

type SpinnerBaseProp = SpinnerWrapperProp & {
  color?: string,
};

const SpinnerWrapper = styled.div<SpinnerWrapperProp>`
	position: relative;
	width: ${props => props.size ?? templateSize};
	height: ${props => props.size ?? templateSize};
`;

const SpinnerBase = styled.div<SpinnerBaseProp>`
	position: absolute;
  left: 0;
  top: 0;
  content: '';
  width: ${props => props.size ?? templateSize};
  height: ${props => props.size ?? templateSize};
  background-color: none;
  border: 3px solid ${props => props.color ?? templateColor};
  opacity: 0;
  translate: scale(0);
  border-radius: 100%;
`;

const scaleOut = keyframes`
	0% { 
		transform: scale(0);
		opacity: 1;
	}
	90% {
		transform: scale(1.0);
		opacity: 0;
	}
`;

const Spinner1 = styled(SpinnerBase)`
  animation: ${scaleOut} ${duration}s infinite ease-out;
`;
const Spinner2 = styled(SpinnerBase)`
  animation: ${scaleOut} ${duration}s infinite ease-out calc(${delay}s * 2);
`;
const Spinner3 = styled(SpinnerBase)`
  animation: ${scaleOut} ${duration}s infinite ease-out calc(${delay}s * 4);
`;

export const Spinner: React.VFC<SpinnerProp> = (p) => {
  const size = typeof p.size === 'string' ? p.size : p.size + 'px';
  return (
    <SpinnerWrapper size={size} color={p.color}>
      <Spinner1 size={size} color={p.color}/>
      <Spinner2 size={size} color={p.color}/>
      <Spinner3 size={size} color={p.color}/>
    </SpinnerWrapper>
  );
};
