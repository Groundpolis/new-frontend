import { useMemo } from 'react';
import { api } from 'misskey-js';

type MisskeyApiOption = {
    origin: api.APIClient['origin'];
    credential?: api.APIClient['credential'];
};

export function useMisskeyClient(opts: MisskeyApiOption) {
  const client = useMemo(() => new api.APIClient(opts), [opts.origin, opts.credential]);
  return client;
}
