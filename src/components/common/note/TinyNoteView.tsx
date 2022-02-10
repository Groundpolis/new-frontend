import { UserDetailed } from 'misskey-js/built/entities';
import React from 'react';
import styled from 'styled-components';
import Avatar from '../Avatar';
import { Gpfm } from '../Gpfm';
import NoteHeader from './NoteHeader';
import { BodyWrapper, NoteViewProp } from './NoteView';

const Container = styled.div`
  display: flex;
  min-width: 0;
  gap: var(--margin);
  > main {
    flex: 1;
  }
`;

export default function TinyNoteView({note}: NoteViewProp) {

  return (
    <Container>
      <Avatar user={note.user as UserDetailed} size={48} />
      <main>
        <NoteHeader note={note} />
        {note.text && <BodyWrapper className="mt-1"><Gpfm text={note.text}/></BodyWrapper>}
      </main>
    </Container>
  );
}
