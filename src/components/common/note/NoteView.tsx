import React, { useState } from 'react';
import { Note } from 'misskey-js/built/entities';
import { FaEllipsisH, FaPlus, FaReply, FaRetweet, FaSmile } from 'react-icons/fa';
import styled from 'styled-components';
import { animationFade } from '../../../animation';
import { useMisskeyClient } from '../../../hooks/useMisskeyClient';
import { notImpl } from '../../../scripts/not-impl';
import { useAppSelector } from '../../../store';
import Dialog from '../dialogs/Dialog';
import { Gpfm } from '../Gpfm';
import { showModal } from './show-modal';
import NoteHeader from './NoteHeader';
import { getName } from '../../../scripts/get-name';

export type NoteViewProp = {
  note: Note,
};

const Container = styled.div`
  ${animationFade};
`;

const BodyWrapper = styled.p`
  word-break: break-all;
  word-wrap: normal;
  margin: 0;
`;

const QuoteContainer = styled.blockquote`
  border: 1px solid var(--tone-4);
`;

const Commands = styled.div`
  > button {
    font-size: 1em;
  }
`;

export default function NoteView(p: NoteViewProp) {
  const api = useMisskeyClient();
  const {userCache} = useAppSelector(state => state.session);

  const [isCwOpened, setCwOpened] = useState(false);

  // Renoted を表示するかどうか
  const isRenote = Boolean(p.note.renote);
  const appearNote = p.note.renote && !p.note.text ? p.note.renote : p.note;
  const reply = appearNote.reply;
  const renote = appearNote.renote;
  const user = appearNote.user;
  const renotedUser = isRenote ? p.note.user : null;
  const canRenote = !!userCache && (appearNote.visibility !== 'followers' || appearNote.userId === userCache.id);

  const isVisibleBody = !appearNote.cw || isCwOpened;

  const onClickReply = () => {
    notImpl();
  };

  const onClickRenote = () => {
    showModal(Dialog, {
      type: 'text',
      message: '本当にリノートしますか？',
      buttonType: 'yesNo',
      onClick(i: number) {
        if (i === 0) {
          api.request('notes/create', {
            renoteId: appearNote.id,
            visibility: appearNote.visibility,
          });
        }
      }
    });
  };

  const onClickReaction = () => {
    notImpl();
  };

  const onClickMore = () => {
    notImpl();
  };

  return (
    <Container className="card">
      <div className="body pb-1">
        {renotedUser && (
          <div className="text-dimmed flex f-middle mb-2">
            <FaRetweet className="mr-1 text-125"/>
            <img src={renotedUser.avatarUrl} className="circle mr-1" style={{width: '1.5em', height: '1.5em'}} />
            {getName(renotedUser)}さんがリノートしました
          </div>
        )}
        <div className="hstack">
          <img src={user.avatarUrl} className="circle" style={{width: 64, height: 64}} />
          <main style={{flex: 1, minWidth: 0}}>
            <NoteHeader note={appearNote} />
            {appearNote.cw && (
              <aside className="mt-1">
                {appearNote.cw}
                <button className="btn flat text-75 ml-1 text-white" style={{padding: '4px 8px', background: 'var(--tone-4)'}} onClick={() => setCwOpened(!isCwOpened)}>
                  {isCwOpened ? '隠す' : `もっと見る(${appearNote.text?.length ?? 0}文字${appearNote.files && appearNote.files.length > 0 ? ', ' + appearNote.files.length + 'ファイル' : ''})`}
                </button>
              </aside>
            )}
            {isVisibleBody && (
              <>
                {appearNote.text && <BodyWrapper className="mt-1"><Gpfm text={appearNote.text}/></BodyWrapper>}
                {renote && appearNote.text && (
                  <QuoteContainer className="rounded mt-1 pa-1">
                    <NoteHeader note={renote} />
                    {renote.text && <BodyWrapper className="mt-1"><Gpfm text={renote.text}/></BodyWrapper>}
                  </QuoteContainer>
                )}
              </>
            )}
          </main>
        </div>
        <Commands className="hstack f-right">
          <button className="btn flat" onClick={onClickReply}>
            <FaReply />
            {appearNote.repliesCount > 0 && <span className="text-dimmed ml-1">{appearNote.repliesCount < 10 ? appearNote.repliesCount : '9+'}</span>}
          </button>
          <button className="btn flat" onClick={onClickRenote} disabled={!canRenote}>
            <FaRetweet />
            {appearNote.renoteCount > 0 && <span className="text-dimmed ml-1">{appearNote.renoteCount < 10 ? appearNote.renoteCount : '9+'}</span>}
          </button>
          <button className="btn flat" onClick={onClickReaction}><FaSmile /><FaPlus /></button>
          <button className="btn flat" onClick={onClickMore}><FaEllipsisH /></button>
        </Commands>
      </div>
    </Container>
  );
}
