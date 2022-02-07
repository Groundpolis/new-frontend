import { CustomEmoji, Note, UserDetailed } from 'misskey-js/built/entities';
import React, { MouseEvent, useState } from 'react';
import { FaCopy, FaEllipsisH, FaExternalLinkAlt, FaLink, FaPlus, FaReply, FaRetweet, FaSmile, FaTrashAlt } from 'react-icons/fa';
import styled, { css } from 'styled-components';
import { animationFade } from '../../../animation';
import { useMisskeyClient } from '../../../hooks/useMisskeyClient';
import copyToClipboard from '../../../scripts/copy-to-clipboard';
import { getName } from '../../../scripts/get-name';
import { getSimilarEmojiFromLocal } from '../../../scripts/get-similar-emoji-from-local';
import { isBlacklistedEmojiName } from '../../../scripts/is-blacklisted-emoji';
import { notImpl } from '../../../scripts/not-impl';
import { showModal } from '../../../scripts/show-modal';
import { showPopupAt } from '../../../scripts/show-popup';
import { useAppSelector } from '../../../store';
import Avatar from '../Avatar';
import Dialog from '../dialogs/Dialog';
import EmojiView from '../EmojiView';
import { Gpfm } from '../Gpfm';
import EmojiMartPicker from '../popup/EmojiMartPicker';
import MenuPopup, { MenuItemSection } from '../popup/MenuPopup';
import NoteHeader from './NoteHeader';
import NoteMedia from './NoteMedia';


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

const ReactionButton = styled.button<{active?: boolean}>`
  padding: 2px 8px;
  border-radius: var(--radius);
  border: 1px solid transparent;
  cursor: pointer;
  &:not(:disabled) {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    &:hover, &:focus {
      border: 1px solid var(--primary);
      background: var(--hover);
    }
    &:active {
      box-shadow: none;
    }
    ${props => props.active ? css`{
      box-shadow: none;
      background: var(--primary);
      transform: translateY(2px);
      &:hover, &:focus {
        background: var(--primary);
      }
    }` : null}
  }
  > span {
    color: var(--fg);
    margin-left: 4px;
  }
`;

const Commands = styled.div`
  > button {
    font-size: 1em;
  }
`;

export default function NoteView(p: NoteViewProp) {
  const api = useMisskeyClient();
  const {meta, userCache} = useAppSelector(state => state.session);

  if (!meta) throw new TypeError();

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

  const toggleReaction = async (emoji: string,) => {
    if (appearNote.myReaction === emoji) {
      api.request('notes/reactions/delete', { noteId: appearNote.id });
    } else {
      let reaction = emoji.startsWith(':') ? getSimilarEmojiFromLocal(emoji, meta) : emoji;
      if (!reaction) {
        const u = userCache as UserDetailed;
        const [name, host] = emoji.substring(1, emoji.length - 1).split('@');
        if (!isBlacklistedEmojiName(name) && (u?.isModerator || u?.isAdmin)) {
          const i = await new Promise<number>(res => showModal(Dialog, {
            type: 'text',
            message: 'そのリアクション絵文字は、まだ本サーバーには登録されていません。コピーしますか？\n<small>（コピー元絵文字は著作権で保護されている場合があります。必ずご確認ください。）</small>',
            buttonType: 'yesNo',
            onClick: res,
          }));

          if (i === 0) {
            const theEmoji = (await api.request('admin/emoji/list-remote', {
              limit: 100,
              query: name,
              host,
            }) as unknown[] as CustomEmoji[]).find(e => e.name === name);
            if (!theEmoji) {
              showModal(Dialog, {
                type: 'text',
                message: '不明なエラーが発生しました。',
                buttonType: 'ok',
              });
              return;
            }
            await api.request('admin/emoji/copy', {
              emojiId: theEmoji.id,
            });
            reaction = `:${theEmoji.name}:`;
          } else {
            return;
          }
        } else {
          showModal(Dialog, {
            type: 'text',
            message: 'そのリアクション絵文字は、本サーバーには登録されていないため利用できません。',
            buttonType: 'ok',
          });
          return;
        }
      }
      api.request('notes/reactions/create', { noteId: appearNote.id, reaction });
    }
  };

  const onClickReply = () => {
    notImpl();
  };

  const onClickRenote = () => {
    renote();
  };

  const onClickReaction = (e: MouseEvent) => {
    showPopupAt(EmojiMartPicker, e.target as Element, {
      onChoose(reaction: string) {
        api.request('notes/reactions/create', { noteId: appearNote.id, reaction });
      },
    });
  };

  const onClickMore = (e: MouseEvent) => {
    const items: MenuItemSection[] = [];
    items.push([{
      type: 'button',
      icon: FaCopy,
      label: '内容をコピー',
      onClick: copyContent,
    }, {
      type: 'button',
      icon: FaLink,
      label: 'リンクをコピー',
      onClick: copyLink,
    }]);
    if (appearNote.user.host) {
      items.push([{
        type: 'button',
        icon: FaExternalLinkAlt,
        label: 'リモートで見る',
        onClick: showOnRemote,
      }]);
    }
    if (isMyNote) {
      items.push([{
        type: 'button',
        icon: FaTrashAlt,
        label: '削除',
        onClick: deleteNote,
      }]);
    }
    showPopupAt(MenuPopup, e.target as Element, { items });
  };

  return (
    <Container className="card">
      <div className="body pb-1">
        {renotedUser && (
          <div className="text-dimmed flex f-middle mb-2">
            <FaRetweet className="mr-1 text-125"/>
            <img src={renotedUser.avatarUrl} className="circle mr-1" style={{width: '1.5em', height: '1.5em'}} />
            <span>
              <Gpfm plain emojis={renotedUser.emojis} text={getName(renotedUser)} /> さんがリノートしました
            </span>
          </div>
        )}
        <div className="hstack">
          <Avatar user={appearNote.user as UserDetailed} />
          <main style={{flex: 1, minWidth: 0}}>
            <NoteHeader note={appearNote} />
            {appearNote.cw && (
              <aside className="mt-1">
                <Gpfm text={appearNote.cw} />
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
                {appearNote.files.length > 0 && <NoteMedia files={appearNote.files} />}
              </>
            )}
            <div className="hstack wrap slim mt-2">
              {Object.entries(appearNote.reactions).map(([emoji, count]) => (
                <ReactionButton className="clickable" key={emoji} active={appearNote.myReaction === emoji} onClick={() => toggleReaction(emoji)}>
                  <EmojiView emoji={emoji} customEmojis={appearNote.emojis} normal />
                  <span>{count}</span>
                </ReactionButton>
              ))}
            </div>
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
