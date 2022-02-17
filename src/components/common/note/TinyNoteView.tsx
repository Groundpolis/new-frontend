import { Note, UserDetailed } from 'misskey-js/built/entities';
import React, { useState } from 'react';
import styled from 'styled-components';
import Avatar from '../Avatar';
import { GpfmView } from '../GpfmView';
import NoteHeader from './NoteHeader';
import { BodyWrapper } from './NoteView';

const Container = styled.div`
  display: flex;
  min-width: 0;
  gap: var(--margin);
  > main {
    flex: 1;
  }
`;

export type TinyNoteViewProp = {
  note: Note,
  isReply?: boolean,
  noLink?: boolean,
};

export default function TinyNoteView({note, isReply, noLink}: TinyNoteViewProp) {
  const [isCwOpened, setCwOpened] = useState(false);
  const isVisibleBody = !note.cw || isCwOpened;

  return (
    <Container>
      <Avatar user={note.user as UserDetailed} size={48} />
      <main style={{flex: 1, minWidth: 0}}>
        <NoteHeader note={note} noLink={noLink} />
        {note.cw && (
          <aside className="mt-1">
            <GpfmView text={note.cw} emojis={note.emojis} />
            <button className="btn flat text-75 ml-1 text-white" style={{padding: '4px 8px', background: 'var(--tone-4)'}} onClick={() => setCwOpened(!isCwOpened)}>
              {isCwOpened ? '隠す' : `もっと見る(${note.text?.length ?? 0}文字${note.files && note.files.length > 0 ? ', ' + note.files.length + 'ファイル' : ''})`}
            </button>
          </aside>
        )}
        {isVisibleBody && note.text && (
          <BodyWrapper className="mt-1">
            {isReply && <i className="fas fa-reply text-primary"/>}
            <GpfmView text={note.text}/>
          </BodyWrapper>
        )}
      </main>
    </Container>
  );
}
