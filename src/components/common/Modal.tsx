import React, { HTMLAttributes, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { animationFade, animationFadeUp } from '../../animation';

export type ModalAlignment = 'top' | 'center' | 'bottom';

const Backdrop = styled.div<{full: boolean}>`
  display: flex;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  padding: ${p => p.full ? '' : 'var(--margin)'};
  inset: 0;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  ${animationFade}
  &.top {
    align-items: flex-start;
  }
  &.bottom {
    align-items: flex-end;
  }
  > * {
    ${animationFadeUp}
  }
`;

export type ModalFunction<P extends ModalProp = ModalProp> = (prop: P) => JSX.Element;

export type ModalProp = {
  close: VoidFunction;
  closeByBackdrop?: boolean;
  align?: ModalAlignment;
  full?: boolean;
  innerClassName?: HTMLAttributes<HTMLDivElement>['className'];
  innerStyle?: HTMLAttributes<HTMLDivElement>['style'];
};

export default function Modal(prop: PropsWithChildren<ModalProp>) {
  const onClickModal = () => {
    if (prop.closeByBackdrop) {
      prop.close();
    }
  };

  return (
    <Backdrop onClick={onClickModal} className={prop.align ?? 'center'} full={prop.full ?? false}>
      <div className={prop.innerClassName} style={prop.innerStyle} onClick={e => e.stopPropagation()}>
        {prop.children}
      </div>
    </Backdrop>
  );
}
