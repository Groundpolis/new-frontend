import { useCallback } from 'react';
import { v4 as uuid } from 'uuid';

import Dialog from '../components/common/dialogs/Dialog';
import { showModal } from '../components/common/note/show-modal';
import { useAppSelector } from '../store';

const name ='Groundpolis New Frontend';
const callback = encodeURI(`${location.origin}/miauth`);

const permission = [
  'read:account',
  'write:account',
  'read:blocks',
  'write:blocks',
  'read:drive',
  'write:drive',
  'read:favorites',
  'write:favorites',
  'read:following',
  'write:following',
  'read:messaging',
  'write:messaging',
  'read:mutes',
  'write:mutes',
  'write:notes',
  'read:notifications',
  'write:notifications',
  'read:reactions',
  'write:reactions',
  'write:votes',
  'read:pages',
  'write:pages',
  'write:page-likes',
  'read:page-likes',
  'read:user-groups',
  'write:user-groups',
  'read:channels',
  'write:channels',
  'read:gallery',
  'write:gallery',
  'read:gallery-likes',
  'write:gallery-likes',
] as const;

export function useAuthenticate() {
  const {meta, host} = useAppSelector(state => state.session);
  return useCallback(() => {
    if (!meta) return;
    if (!meta.features.miauth) {
      showModal(Dialog, {
        type: 'text',
        title: 'ログインできません',
        message: `${host} は MiAuth に対応していないため、ログインできません。`,
        buttonType: 'ok',
      });
      return;
    }

    const session = uuid();
    const url = `https://${host}/miauth/${session}?name=${encodeURIComponent(name)}&de&callback=${encodeURIComponent(callback)}&permission=${encodeURIComponent(permission.join(','))}`;
    location.href = url;
  }, [meta]);
}