import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { animationFade, animationFadeUp } from '../../animation';

const Backdrop = styled.div`
  display: flex;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: var(--margin);
  justify-content: center;
  align-items: center;
  z-index: 1000;
  ${animationFade}
  > * {
    ${animationFadeUp}
  }
`;

export type ModalFunction<P extends ModalProp = ModalProp> = (prop: P) => JSX.Element;

export type ModalProp = {
  close: VoidFunction;
  closeByBackdrop?: boolean;
  innerClassName?: string;
};

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
