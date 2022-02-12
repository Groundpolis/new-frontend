import React, { PropsWithChildren, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { animationFadeUp } from '../../animation';

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
  const popupRef = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState(p.left);
  const [top, setTop] = useState(p.top);
  const onClickModal = () => {
    p.close();
  };
  
  useLayoutEffect(() => {
    if (!popupRef.current) return;
    const {x, y, width: w, height: h} = popupRef.current.getBoundingClientRect();
    const {clientWidth: vw, clientHeight: vh} = document.documentElement;

    if (x < 0) setLeft(0);
    if (y < 0) setTop(0);
    if (vw < x + w) setLeft(vw - w);
    if (vh < y + h) setTop(vh - h);
  }, [popupRef]);

  return (
    <Backdrop onClick={onClickModal}>
      <Container left={left} top={top}  ref={popupRef} className={'shadow-1 rounded ' + p.innerClassName} onClick={e => e.stopPropagation()}>
        {p.children}
      </Container>
    </Backdrop>
  );
}
