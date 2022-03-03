import React, { useEffect, useState } from 'react';
import { User, UserDetailed } from 'misskey-js/built/entities';
import { useAppSelector } from '../../store';
import { useMisskeyClient } from '../../hooks/useMisskeyClient';
import { useStreaming } from '../../hooks/useStreaming';

export default function FollowButton({user, onChange}: {user: UserDetailed, onChange?: (user: User) => void}) {
  const { userCache } = useAppSelector(state => state.session);
  const api = useMisskeyClient();
  const stream = useStreaming();

  const [isDisabled, setDisabled] = useState(false);

  const onClick = () => {
    setDisabled(true);
    api.request(user.isFollowing ? 'following/delete' : 'following/create', {
      userId: user.id,
    });
  };

  useEffect(() => {
    if (!stream) return;
    const main = stream?.useChannel('main');
    main.on('follow', (u) => {
      if (u.id !== user.id) return;
      setDisabled(false);
      if (onChange) onChange(u);
    });
    main.on('unfollow', (u) => {
      if (u.id !== user.id) return;
      setDisabled(false);
      if (onChange) onChange(u);
    });
    return () => {
      main.dispose();
    };
  }, [stream]);

  return (
    <button className={`btn circle ${user.isFollowing ? '' : 'outline'} primary`} disabled={isDisabled} onClick={onClick}>
      {user.isFollowing ? 'フォロー解除' : user.isLocked ? 'フォローを申請' : 'フォロー'}
    </button>
  );
}
