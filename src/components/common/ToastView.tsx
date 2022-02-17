import { Notification } from 'misskey-js/built/entities';
import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { NotificationView } from './NotificationView';

export type ToastProp = HTMLAttributes<HTMLDivElement> & ({ notification: Notification } | { newArrivals: number });

const Container = styled.div`
  width: 250px;
  height: 80px;
`;

export default function Toast(p: ToastProp) {
  const inner = 'notification' in p ? (
    <NotificationView data={p.notification} />
  ) : (
    <p>新着通知が{p.newArrivals}件あります</p>
  );
  return (
    <Container {...p} className={`card shadow-2 acrylic px-1 py-2 ${p.className}`}>
      {inner}
    </Container>
  );
}
