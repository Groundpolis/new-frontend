import { Note } from 'misskey-js/built/entities';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NoteView from '../components/common/note/NoteView';
import { useMisskeyClient } from '../hooks/useMisskeyClient';

export default function NotePage() {
  const [note, setNote] = useState<Note | null>(null);
  const {noteId} = useParams();

  const api = useMisskeyClient();

  useEffect(() => {
    if (!noteId) return;
    api.request('notes/show', { noteId }).then(setNote);
  }, [api, noteId]);

  return (
    <>
      <div className="container">
        {note ? (
          <NoteView note={note} onNoteUpdate={setNote} />
        ) : (
          <div className="skeleton" style={{height: 136}} />
        )}
      </div>
    </>
  );
}
