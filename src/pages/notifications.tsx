import { Notification } from 'misskey-js/built/entities';
import React, { useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import ActionBar from '../components/common/action-bar/ActionBar';
import ActionBarButton from '../components/common/action-bar/ActionBarButton';
import { NotificationView } from '../components/common/NotificationView';
import { Spinner } from '../components/common/Spinner';
import { useMisskeyClient } from '../hooks/useMisskeyClient';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [prevUntilId, setPrevUntilId] = useState<string | undefined>('');
  const [untilId, setUntilId] = useState<string | undefined>(undefined);
  const [nextUntilId, setNextUntilId] = useState<string | undefined>(undefined);
  const [isLoading, setLoading] = useState(false);

  const api = useMisskeyClient();

  useEffect(() => {
    if (isLoading || (untilId === prevUntilId)) return;
    setPrevUntilId(untilId);
    setLoading(true);
    api.request('i/notifications', {
      limit: 10,
      untilId,
    }).then(r => {
      setNotifications(n => [...n, ...r]);
      setNextUntilId(r[r.length - 1].id);
      setLoading(false);
    });
  }, [api, isLoading, prevUntilId, untilId]);

  const onClickMore = () => {
    setUntilId(nextUntilId);
  };

  return (
    <>
      <ActionBar>
        <h1>通知</h1>
        <ActionBarButton className="ml-auto"><FaFilter /></ActionBarButton>
      </ActionBar>
      <div className="container">
        <div className="vgroup outline">
          {notifications.map(n => (
            <div className="card" key={n.id}>
              <div className="body">
                <NotificationView data={n} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex f-center mt-2">
          {isLoading ? <Spinner size={96} /> : <button className="btn" onClick={onClickMore}>もっと見る</button>}
        </div>
      </div>
    </>
  );
}
