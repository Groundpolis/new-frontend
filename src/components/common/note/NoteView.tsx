import React, { MouseEvent, useState } from 'react';
import { Note, UserDetailed } from 'misskey-js/built/entities';
import { FaCopy, FaEllipsisH, FaExternalLinkAlt, FaLink, FaPlus, FaReply, FaRetweet, FaSmile, FaTrashAlt } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';
import { animationFade } from '../../../animation';
import { useMisskeyClient } from '../../../hooks/useMisskeyClient';
import { notImpl } from '../../../scripts/not-impl';
import { useAppSelector } from '../../../store';
import Dialog from '../dialogs/Dialog';
import { Gpfm } from '../Gpfm';
import { showModal } from '../../../scripts/show-modal';
import NoteHeader from './NoteHeader';
import { getName } from '../../../scripts/get-name';
import { showPopup } from '../../../scripts/show-popup';
import MenuPopup, { MenuItemSection } from '../popup/MenuPopup';
import { ItemProp } from '../Menu';
import copyToClipboard from '../../../scripts/copy-to-clipboard';
import { User } from '../../../models/user';

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


const earwiggleleft = keyframes`
	from { transform: rotate(37.6deg) skew(30deg); }
	25% { transform: rotate(10deg) skew(30deg); }
	50% { transform: rotate(20deg) skew(30deg); }
	75% { transform: rotate(0deg) skew(30deg); }
	to { transform: rotate(37.6deg) skew(30deg); }
`;
const earwiggleright = keyframes`
	from { transform: rotate(-37.6deg) skew(-30deg); }
	30% { transform: rotate(-10deg) skew(-30deg); }
	55% { transform: rotate(-20deg) skew(-30deg); }
	75% { transform: rotate(0deg) skew(-30deg); }
	to { transform: rotate(-37.6deg) skew(-30deg); }
`;

const AvatarWrapper = styled.div`
position: relative;
&.cat {
  &:before, &:after {
      background: #df548f;
      border: solid 4px currentColor;
      box-sizing: border-box;
      content: '';
      display: inline-block;
      height: 50%;
      width: 50%;
  }
  &:before {
      border-radius: 0 75% 75%;
      transform: rotate(37.5deg) skew(30deg);
  }
  &:after {
      border-radius: 75% 0 75% 75%;
      transform: rotate(-37.5deg) skew(-30deg);
  }
  &.animated:hover {
      &:before {
          animation: ${earwiggleleft} 1s infinite;
      }
      &:after {
          animation: ${earwiggleright} 1s infinite;
      }
  }
}
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
  const quote = appearNote.renote;
  const user = appearNote.user;
  const renotedUser = isRenote ? p.note.user : null;

  const isVisibleBody = !appearNote.cw || isCwOpened;
  const isMyNote = user.id === userCache?.id;
  const canRenote = !!userCache && (appearNote.visibility !== 'followers' || isMyNote);

  const renote = () => {
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

  const deleteNote = () => {
    showModal(Dialog, {
      type: 'text',
      message: 'このノートを削除しますか？',
      closeByBackdrop: true,
      buttonType: 'yesNo',
      onClick(i) {
        if (i === 0) {
          api.request('notes/delete', {
            noteId: appearNote.id,
          });
        }
      },
    });
  };

  const copyContent = () => {
    if (!appearNote.text) return;
    copyToClipboard(appearNote.text);
  };

  const showOnRemote = () => {
    window.open(appearNote.url || appearNote.uri, '_blank');
  };

  const copyLink = () => {
    copyToClipboard(`${location.origin}/notes/${appearNote.id}`);
  };

  const onClickReply = () => {
    notImpl();
  };

  const onClickRenote = () => {
    renote();
  };

  const onClickReaction = () => {
    notImpl();
  };

  const onClickMore = (e: MouseEvent) => {
    const sections: MenuItemSection[] = [];
    sections.push([{
      type: 'button',
      icon: FaCopy,
      label: '内容をコピー',
      onClick: copyContent,
    },{
      type: 'button',
      icon: FaLink,
      label: 'リンクをコピー',
      onClick: copyLink,
    }]);
    if (appearNote.user.host) {
      sections.push([{
        type: 'button',
        icon: FaExternalLinkAlt,
        label: 'リモートで見る',
        onClick: showOnRemote,
      }]);
    }
    if (isMyNote) {
      sections.push([{
        type: 'button',
        icon: FaTrashAlt,
        label: '削除',
        onClick: deleteNote,
      }]);
    }
    showPopup(MenuPopup, {
      left: e.clientX,
      top: e.clientY,
      items: sections,
    });
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
          <AvatarWrapper className={(appearNote.user as UserDetailed).isCat ? 'animated cat' : ''} style={{width: 64, height: 64}}>
            <img src={user.avatarUrl} className="circle" style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 10,
            }} />
          </AvatarWrapper>
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
                {quote && appearNote.text && (
                  <QuoteContainer className="rounded mt-1 pa-1">
                    <NoteHeader note={quote} />
                    {quote.text && <BodyWrapper className="mt-1"><Gpfm text={quote.text}/></BodyWrapper>}
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
