import React, { PropsWithChildren } from 'react';
import styled, { keyframes } from 'styled-components';
import { ModalProp } from './ModalProp';

export type ModalFunction<P extends ModalProp = ModalProp> = (prop: P) => JSX.Element;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const dialogIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(48px);
  }
  to {
    opacity: 1;
    transform: none;
  }
`;

const duration = '0.5s';
const bezier = 'cubic-bezier(0, .5, .5, 1)';

const Backdrop = styled.div`
  display: flex;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  animation: ${duration} ${bezier} ${fadeIn};
  > * {
    animation: ${duration} ${bezier} ${dialogIn};
  }
`;

export default function Modal(prop: PropsWithChildren<ModalProp>) {
  const onClickModal = () => {
    if (prop.closeByBackdrop) {
      prop.close();
    }
  };

  return (
    <Backdrop onClick={onClickModal}>
      <div className={prop.innerClassName} onClick={e => e.stopPropagation()}>
        {prop.children}
      </div>
    </Backdrop>
  );
}
