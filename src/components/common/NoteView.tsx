import { Note, User } from 'misskey-js/built/entities';
import React from 'react';
import { FaEllipsisH, FaEnvelope, FaGlobe, FaHome, FaLock, FaPlus, FaQuestion, FaQuestionCircle, FaReply, FaRetweet, FaSmile } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { animationFade } from '../../animation';
import { Gpfm } from './Gpfm';

export type NoteViewProp = {
  note: Note,
};

const getName = (user: User) => user.name || user.username;

const Container = styled.div`
  ${animationFade};
`;

const BodyWrapper = styled.p`
  word-break: break-all;
  word-wrap: normal;
  margin: 0;
`;

const getVisibilityIcon = (visibility: string, showGlobal = true) => {
  switch(visibility) {
  case 'public': return showGlobal ? <FaGlobe /> : null;
  case 'home': return <FaHome />;
  case 'followers': return <FaLock />;
  case 'specified': return <FaEnvelope />;
  default: return <FaQuestion />;
  }
};

const QuoteContainer = styled.blockquote`
  border: 1px solid var(--tone-4);
`;

const NoteHeader = styled.header`
  white-space: nowrap;
  min-width: 0;
  .item {
    color: currentColor;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Commands = styled.div`
  > button {
    font-size: 1em;
  }
`;

export default function NoteView(p: NoteViewProp) {
  // Renoted を表示するかどうか
  const isRenote = Boolean(p.note.renote);
  const appearNote = p.note.renote && !p.note.text ? p.note.renote : p.note;
  const reply = appearNote.reply;
  const renote = appearNote.renote;
  const user = appearNote.user;

  const icon = getVisibilityIcon(appearNote.visibility, false);
  const renotedUser = isRenote ? p.note.user : null;
  return (
    <Container className="card">
      <div className="body px-4 py-2">
        {renotedUser && (
          <div className="text-green flex f-middle">
            <FaRetweet className="mr-1 text-125"/>
            <img src={renotedUser.avatarUrl} className="circle mr-1" style={{width: '1.5em', height: '1.5em'}} />
            {getName(renotedUser)}さんがリノートしました
          </div>
        )}
        <div className="hstack pt-2">
          <img src={user.avatarUrl} className="circle" style={{width: 64, height: 64}} />
          <main style={{flex: 1, minWidth: 0}}>
            <NoteHeader className="text-100 flex f-center f-middle">
              <Link className="item" to={`/@${user.username}${user.host ? `@${user.host}` : ''}`}>
                <b className="item">{getName(user)}</b>
                <span className="item text-dimmed text-normal ml-1">@{user.username}</span>
                {user.host && <span className="item" style={{opacity: 0.5}}>@{user.host}</span>}
              </Link>
              <a href="#" className="text-dimmed ml-auto mr-1 time">TBD</a>
              {icon}
            </NoteHeader>
            {appearNote.text && <BodyWrapper className="mt-1"><Gpfm text={appearNote.text}/></BodyWrapper>}
            {renote && appearNote.text && (
              <QuoteContainer className="rounded mt-1 pa-1">
                <NoteHeader className="text-100 flex f-center f-middle">
                  <img src={renote.user.avatarUrl} className="circle mr-1" style={{width: '1.5em', height: '1.5em'}} />
                  <b><Gpfm plain text={getName(renote.user)} /></b>
                  <span className="text-dimmed text-normal ml-1">
                    @{renote.user.username}{renote.user.host && <span style={{opacity: 0.5}}>@{renote.user.host}</span>}
                  </span>
                  <a href="#" className="text-dimmed ml-auto mr-1">TBD</a>
                  {icon}
                </NoteHeader>
                {renote.text && <BodyWrapper className="mt-1"><Gpfm text={renote.text}/></BodyWrapper>}
              </QuoteContainer>
            )}
          </main>
        </div>
        <Commands className="hstack f-right">
          <button className="btn flat"><FaReply /></button>
          <button className="btn flat">
            <FaRetweet />
            {appearNote.renoteCount > 0 && <span className="text-dimmed ml-1">{appearNote.renoteCount < 10 ? appearNote.renoteCount : '9+'}</span>}
          </button>
          <button className="btn flat"><FaSmile /><FaPlus /></button>
          <button className="btn flat"><FaEllipsisH /></button>
        </Commands>
      </div>
    </Container>
  );
}
