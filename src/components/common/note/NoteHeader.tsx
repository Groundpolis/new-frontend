import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getName } from '../../../scripts/get-name';
import { NoteViewProp } from './NoteView';
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

export default function NoteHeader({note}: NoteViewProp) {
  const user = note.user;
  return (
    <Container className="text-100 flex f-center f-middle">
      <Link className="item" to={`/@${user.username}${user.host ? `@${user.host}` : ''}`}>
        <b className="item">{getName(user)}</b>
        <UserNameView user={user} />
      </Link>
      <a href="#" className="text-dimmed ml-auto mr-1 time">TBD</a>
      <VisibilityIcon visibility={note.visibility} hiddenGlobal />
    </Container>
  );
}
