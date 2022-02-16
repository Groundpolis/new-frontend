import { Notification } from 'misskey-js/built/entities';
import React, { useEffect, useState } from 'react';
import { useMisskeyClient } from '../../hooks/useMisskeyClient';
import { NotificationView } from './NotificationView';
import { Spinner } from './Spinner';

export default function NotificationListView({slim}: {slim?: boolean}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [untilId, setUntilId] = useState<string | undefined>(undefined);
  const [isLoading, setLoading] = useState(false);

  const api = useMisskeyClient();

  useEffect(() => {
    if (!api) return;
    loadNextPage();
  }, [api]);

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
          <div className="px-1 py-2" key={n.id}>
            <NotificationView data={n} slim={slim} />
          </div>
        ))}
      </div>
      <div className="flex f-center mt-2">
        {isLoading ? <Spinner size={96} /> : <button className="btn" onClick={loadNextPage}>もっと見る</button>}
      </div>
    </>
  );
}
