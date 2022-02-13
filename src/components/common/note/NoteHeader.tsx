import { toString } from 'misskey-js/built/acct';
import { Note } from 'misskey-js/built/entities';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getName } from '../../../scripts/get-name';
import { Gpfm } from '../Gpfm';
import TimeView from '../TimeView';
import UserNameView from '../UserNameView';
import { VisibilityIcon } from '../VisibilityIcon';

const Container = styled.header`
  white-space: nowrap;
  min-width: 0;
  .item {
    color: currentColor;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export type NoteHeaderProp = {
  note: Note;
  noLink?: boolean;
};

export default function NoteHeader({note, noLink}: NoteHeaderProp) {
  const user = note.user;
  const nameSet = (
    <>
      <b className="item"><Gpfm plain emojis={user.emojis} text={getName(user)} /></b>
      <UserNameView user={user} />
    </>
  );
  return (
    <Container className="text-100 flex f-center f-middle">
      {noLink ? (
        <>
          <span className="item">{nameSet}</span>
          <span className="text-dimmed ml-auto time">
            <TimeView time={note.createdAt} />
          </span>
        </>
      ) : (
        <>
          <Link className="item" to={`/@${toString(user)}`}>{nameSet}</Link>
          <Link to={`/notes/${note.id}`} className="text-dimmed ml-auto time">
            <TimeView time={note.createdAt} />
          </Link>
        </>
      )}
      {(note.visibility !== 'public' || note.localOnly) && (
        <span className="ml-1">
          <VisibilityIcon visibility={note.visibility} hiddenGlobal />
        </span>
      )}
    </Container>
  );
}
