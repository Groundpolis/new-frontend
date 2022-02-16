import { Note, UserDetailed } from 'misskey-js/built/entities';
import React from 'react';
import styled from 'styled-components';
import Avatar from '../Avatar';
import { Gpfm } from '../Gpfm';
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
  return (
    <Container>
      <Avatar user={note.user as UserDetailed} size={48} />
      <main style={{flex: 1, minWidth: 0}}>
        <NoteHeader note={note} noLink={noLink} />
        {note.text && (
          <BodyWrapper className="mt-1">
            {isReply && <i className="fas fa-reply text-primary"/>}
            <Gpfm text={note.text}/>
          </BodyWrapper>
        )}
      </main>
    </Container>
  );
}
