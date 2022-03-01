import { parse } from 'misskey-js/built/acct';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ActionBar from '../components/common/action-bar/ActionBar';
import { useMisskeyClient } from '../hooks/useMisskeyClient';
import { User } from '../models/user';

export default function UserPage() {
  const {acct: acctString} = useParams();
  const api = useMisskeyClient();

  const [user, setUser] = useState<User | null>(null);

  if (!acctString) throw new TypeError();
  const {username, host} = parse(acctString);

  useEffect(() => {
    if (!api) return;
    api.request('users/show', {
      username,
      host: host ?? undefined
    }).then(setUser);
  }, [api, username, host]);

  return user ? (
    <>
      <ActionBar>
        <h1>{user.name || user.username}</h1>
      </ActionBar>
      <div className="container">
        <div className="card">
          <div className="body">

          </div>
        </div>
      </div>
    </>
  ) : null;
}
