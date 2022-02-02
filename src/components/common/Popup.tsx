import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { animationFade, animationFadeUp } from '../../animation';

export type ModalFunction<P extends PopupProp = PopupProp> = (prop: P) => JSX.Element;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: transparent;
  z-index: 10000;
`;

const Container = styled.div<{left: number, top: number}>`
  position: fixed;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  z-index: 10000;
  ${animationFadeUp}
  overflow: hidden;
`;

export type PopupProp = {
  close: VoidFunction;
  innerClassName?: string;
  left: number;
  top: number;
};

export type PopupFunction<P extends PopupProp = PopupProp> = (prop: P) => JSX.Element;

export default function Popup(p: PropsWithChildren<PopupProp>) {
  const onClickModal = () => {
    p.close();
  };

  return (
    <Backdrop onClick={onClickModal}>
      <Container left={p.left} top={p.top} className={'shadow-1 rounded ' + p.innerClassName} onClick={e => e.stopPropagation()}>
        {p.children}
      </Container>
    </Backdrop>
  );
}
