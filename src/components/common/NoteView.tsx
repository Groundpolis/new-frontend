import { Note, User } from 'misskey-js/built/entities';
import React from 'react';
import { FaEllipsisH, FaEnvelope, FaGlobe, FaHome, FaLock, FaPlus, FaQuestion, FaQuestionCircle, FaReply, FaRetweet, FaSmile } from 'react-icons/fa';
import styled from 'styled-components';
import { Gpfm } from './Gpfm';

export type NoteViewProp = {
  note: Note,
};

const getName = (user: User) => user.name || user.username;

const BodyWrapper = styled.p`
  word-break: break-all;
  word-wrap: normal;
`;

const getVisibilityIcon = (visibility: string) => {
  switch(visibility) {
  case 'public': return <FaGlobe />;
  case 'home': return <FaHome />;
  case 'followers': return <FaLock />;
  case 'specified': return <FaEnvelope />;
  default: return <FaQuestion />;
  }
};

export default function NoteView(p: NoteViewProp) {
  // Renoted を表示するかどうか
  const isRenote = Boolean(p.note.renote);
  const appearNote = p.note.renote ? p.note.renote : p.note;
  const reply = appearNote.reply;
  const renote = appearNote.renote;
  const user = appearNote.user;

  const icon = getVisibilityIcon(appearNote.visibility);
  const renotedUser = isRenote ? p.note.user : null;
  return (
    <div className="card">
      <div className="body px-4 py-2">
        {renotedUser && (
          <div className="text-green"><FaRetweet className="mr-1"/>{getName(renotedUser)}さんがリノートしました</div>
        )}
        <div className="hstack pt-2">
          <img src={user.avatarUrl} className="circle" style={{width: 64, height: 64}} />
          <main style={{flex: 1}}>
            <h1 className="text-100 flex f-center f-middle">
              <span className="text-bold">{getName(user)}</span>
              <span className="text-dimmed text-normal ml-1">
                @{user.username}{user.host && <span style={{opacity: 0.5}}>@{user.host}</span>}
              </span>
              <span className="text-dimmed ml-auto mr-1"><a href="#">TBD</a></span>
              {icon}
            </h1>
            {appearNote.text && <BodyWrapper className="mt-1"><Gpfm text={appearNote.text}/></BodyWrapper>}
          </main>
        </div>
        <div className="hstack f-right">
          <button className="btn flat"><FaReply /></button>
          <button className="btn flat"><FaRetweet /><span className="text-dimmed ml-1">7</span></button>
          <button className="btn flat"><FaSmile /><FaPlus /></button>
          <button className="btn flat"><FaEllipsisH /></button>
        </div>
      </div>
    </div>
  );
}
