import { Notification } from 'misskey-js/built/entities';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { animationFade } from '../../animation';
import { useMisskeyClient } from '../../hooks/useMisskeyClient';
import { useStreaming } from '../../hooks/useStreaming';
import { NotificationView } from './NotificationView';
import { Spinner } from './Spinner';

const NotificationWrapper = styled.div`
  ${animationFade}
`;

export default function NotificationListView({slim}: {slim?: boolean}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [untilId, setUntilId] = useState<string | undefined>(undefined);
  const [isLoading, setLoading] = useState(false);

  const api = useMisskeyClient();
  const stream = useStreaming();

  useEffect(() => {
    if (!api) return;
    loadNextPage();
  }, [api]);

  useEffect(() => {
    if (!stream) return;
    const main = stream.useChannel('main');
    main.on('notification', n => {
      setNotifications(current => [n, ...current]);
    });
    return () => main.dispose();
  }, [stream]);

  const loadNextPage = () => {
    setLoading(true);
    api.request('i/notifications', {
      limit: 10,
      untilId,
    }).then(r => {
      setNotifications(n => [...n, ...r]);
      setUntilId(r[r.length - 1].id);
      setLoading(false);
    });
  };

  return (
    <>
      <div className="vgroup outline">
        {notifications.map(n => (
          <NotificationWrapper className="px-1 py-2" key={n.id}>
            <NotificationView data={n} slim={slim} />
          </NotificationWrapper>
        ))}
      </div>
      <div className="flex f-center mt-2">
        {isLoading ? <Spinner size={96} /> : <button className="btn" onClick={loadNextPage}>もっと見る</button>}
      </div>
    </>
  );
}
