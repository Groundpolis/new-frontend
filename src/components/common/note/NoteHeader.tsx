import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getName } from '../../../scripts/get-name';
import { Gpfm } from '../Gpfm';
import TimeView from '../TimeView';
import UserNameView from '../UserNameView';
import { VisibilityIcon } from '../VisibilityIcon';
import { NoteViewProp } from './NoteView';

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

export default function NoteHeader({note}: NoteViewProp) {
  const user = note.user;
  return (
    <Container className="text-100 flex f-center f-middle">
      <Link className="item" to={`/@${user.username}${user.host ? `@${user.host}` : ''}`}>
        <b className="item"><Gpfm plain emojis={user.emojis} text={getName(user)} /></b>
        <UserNameView user={user} />
      </Link>
      <Link to={`/notes/${note.id}`} className="text-dimmed ml-auto time">
        <TimeView time={note.createdAt} />
      </Link>
      {(note.visibility !== 'public' || note.localOnly) && (
        <span className="ml-1">
          <VisibilityIcon visibility={note.visibility} hiddenGlobal />
        </span>
      )}
    </Container>
  );
}
