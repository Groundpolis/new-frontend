import { api } from 'misskey-js';
import { useMemo } from 'react';
import { useAppSelector } from '../store';

type MisskeyApiOption = {
    origin: api.APIClient['origin'];
    credential?: api.APIClient['credential'];
};

export function useMisskeyClient(opts?: MisskeyApiOption) {
  const {host, token} = useAppSelector(state => state.session);
  const o = {
    credential: opts?.credential ? opts.credential : token,
    origin: opts?.origin ? opts.origin : 'https://' + host,
  };
  const client = useMemo(() => new api.APIClient(o), [o.origin, o.credential]);
  return client;
}
