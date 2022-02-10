import { Note, UserDetailed } from 'misskey-js/built/entities';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ActionBar from '../components/common/action-bar/ActionBar';
import Avatar from '../components/common/Avatar';
import { Gpfm } from '../components/common/Gpfm';
import NoteView from '../components/common/note/NoteView';
import { Spinner } from '../components/common/Spinner';
import { useMisskeyClient } from '../hooks/useMisskeyClient';
import { getName } from '../scripts/get-name';

export default function NotePage() {
  const [note, setNote] = useState<Note | null>(null);
  const {noteId} = useParams();

  const api = useMisskeyClient();

  const actionBarInner = note ? (
    <>
      <h1 className="hstack slim f-middle">
        <Avatar user={note.user as UserDetailed} size={32} inline />
        <Gpfm plain emojis={note.user.emojis} text={getName(note.user)}/>さんのノート
      </h1>
    </>
  ) : <div className="flex f-middle pl-1"><Spinner size={48} /></div>;

  useEffect(() => {
    if (!noteId) return;
    api.request('notes/show', { noteId }).then(setNote);
  }, [api, noteId]);

  return (
    <>
      <ActionBar>
        {actionBarInner}
      </ActionBar>
      <div className="container">
        {note ? (
          <NoteView note={note} />
        ) : (
          <div className="skeleton" style={{height: 136}} />
        )}
      </div>
    </>
  );
}
