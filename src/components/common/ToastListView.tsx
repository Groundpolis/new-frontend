import { Notification } from 'misskey-js/built/entities';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { animationFadeLeft } from '../../animation';
import { useStreaming } from '../../hooks/useStreaming';
import { delayAsync } from '../../scripts/delay-async';
import ToastView from './ToastView';

const transitionTiming = '0.4s ease-in';

const StyledToast = styled(ToastView)<{index: number}>`
  transition: bottom ${transitionTiming}, right ${transitionTiming};
  position: fixed;
  z-index: ${p => 10000 - p.index};
  bottom: calc(var(--margin) + (80px + var(--margin)) * ${p => p.index});
  right: var(--margin);
  ${animationFadeLeft};
  &.dismiss {
    transition: bottom ${transitionTiming}, right ${transitionTiming}, opacity ${transitionTiming}, transform ${transitionTiming};
    transform: scale(0.3);
  }

`;

type Toast = {
  n: Notification;
  dest: {right: number, bottom: number} | null,
};

export const ToastListView = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const stream = useStreaming();



  useEffect(() => {
    if (!stream) return;
    const main = stream.useChannel('main');

    main.on('notification', async (n) => {
      setToasts(ts => [...ts, { n, dest: null }]);
      await delayAsync(5000);
      // アニメーションさせる
      const bb = document.getElementById('notifications-link')?.getBoundingClientRect();
      if (bb) {
        const [vw, vh] = [document.documentElement.clientWidth, document.documentElement.clientHeight];
        const dest = {
          right: vw - bb.x - 250,
          bottom: vh - bb.y - 80,
        };
        setToasts(ts => ts.map(t => t.n.id === n.id ? {n: t.n, dest} : t));
        await delayAsync(400);
      }
      setToasts(ts => ts.filter(t => t.n.id !== n.id));
    });

    return () => main.dispose();
  }, [stream]);

  return (
    <>{toasts.map((toast, i) => <StyledToast index={i} key={toast.n.id} notification={toast.n} className={toast.dest ? 'dismiss' : ''} style={toast.dest ?? undefined} />)}</>
  );
};