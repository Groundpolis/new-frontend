import React from 'react';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  position: relative;
  flex-shrink: 0;
  overflow: visible;
  width: 504px;
  height: 128px;
`;

const scroll = keyframes`
  from {
    transform: none;
  }
  to {
    transform: translate(-504px);
  }
`;

const Element = styled.svg<ElementProp>`
  position: absolute;
  width: 504px;
  height: 128px;
  fill: ${props => props.color};
  z-index: ${props => props.z};
  animation: ${props => props.speed}s linear ${scroll} infinite;
`;

type ElementProp = {
  color: string;
  speed: number;
  z: number;
};

const speed = 12;

export default function Skyline(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Container {...props}>
      <Element color="var(--gray-19)" speed={speed * 8} z={1}>
        <path d="M0 66h42V48h42v60h24V66h18v42h6V6a6 6 0 1112 0v102h18V36h30v72h12V48h18v60h18V42h36v29.077L324 12l66 81.231V54h24v54h6V48a6 6 0 016-6h48a6 6 0 016 6v108H0V66z" />
      </Element>
      <Element color="var(--gray-18)" speed={speed * 4} z={2}>
        <path d="M0 60h36v18h12V36h24v24h30v18h30V48h30v30h24V60h24V36h48v42h6V54h30v24h6V42h12v36h6V60h36v18h6V54h42v24h36V54h36v30.375h12V60.75h18V138H0V60z" />
      </Element>
      <Element color="var(--gray-17)" speed={speed * 2} z={3}>
        <path d="M18 210V24l6-6h42v48h12V6h42v138h12V48l78-18v114h18V12h24l18 12v120h24V78l12-12h42l12 12v66h12V18h48v126h24V36h24v12h24v162H18z" />
      </Element>
      <Element color="var(--gray-15)" speed={speed * 1} z={4}>
        <path d="M60 90H0v-6h60v-6h12v6h60v-6h12v6h60v-6h12v6h60v-6h12v6h60v-6h12v6h60v-6h12v6h60v-6h12v30h-12V90h-60v18h-12V90h-60v18h-12V90h-60v18h-12V90h-60v18h-12V90h-60v18h-12V90H72v18h432v180H0V108h60V90z" />
      </Element>
    </Container>
  );
}
