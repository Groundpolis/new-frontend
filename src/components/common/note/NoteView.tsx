import produce from 'immer';
import { CustomEmoji, Note, UserDetailed } from 'misskey-js/built/entities';
import { NoteUpdatedEvent } from 'misskey-js/built/streaming.types';
import React, { MouseEvent, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { animationFade } from '../../../animation';
import { useMisskeyClient } from '../../../hooks/useMisskeyClient';
import { useStreaming } from '../../../hooks/useStreaming';
import copyToClipboard from '../../../scripts/copy-to-clipboard';
import { getName } from '../../../scripts/get-name';
import { getSimilarEmojiFromLocal } from '../../../scripts/get-similar-emoji-from-local';
import { isBlacklistedEmojiName } from '../../../scripts/is-blacklisted-emoji';
import { showModal } from '../../../scripts/show-modal';
import { showPopupAt } from '../../../scripts/show-popup';
import { updateNoteViaEvent } from '../../../scripts/update-note-via-event';
import { useAppSelector } from '../../../store';
import Avatar from '../Avatar';
import Dialog from '../dialogs/Dialog';
import NoteEditorDialog from '../dialogs/NoteEditorDialog';
import EmojiView from '../EmojiView';
import { Gpfm } from '../Gpfm';
import EmojiMartPicker from '../popup/EmojiMartPicker';
import MenuPopup, { MenuItemSection } from '../popup/MenuPopup';
import NoteHeader from './NoteHeader';
import NoteMedia from './NoteMedia';
import TinyNoteView from './TinyNoteView';


export type NoteViewProp = {
  note: Note,
  onNoteUpdate?: (updatedNote: Note) => void;
  onNoteDelete?: () => void;
};

const Container = styled.div`
  ${animationFade};
`;

const ReplyWrapper = styled.div`
  margin-bottom: 24px;
  opacity: 0.7;
`;

export const BodyWrapper = styled.p`
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
  const stream = useStreaming();
  const {meta, userCache} = useAppSelector(state => state.session);

  if (!meta) throw new TypeError();

  const [isCwOpened, setCwOpened] = useState(false);

  const hasContent = Boolean(p.note.text);
  const isRenote = Boolean(p.note.renote);
  const appearNote = p.note.renote && !hasContent ? p.note.renote : p.note;
  const reply = appearNote.reply;
  const quote = appearNote.renote;
  const user = appearNote.user;
  const renotedUser = isRenote ? p.note.user : null;

  const me = userCache as UserDetailed;
  const isStaff = me?.isModerator || me?.isAdmin;
  const isVisibleBody = !appearNote.cw || isCwOpened;
  const isMyNote = user.id === me?.id;
  const canRenote = !!me && (appearNote.visibility !== 'followers' || isMyNote);

  const openRenoteMenu = (el: Element) => {
    showPopupAt(MenuPopup, el, {
      items: [[{
        type: 'button',
        icon: 'fas fa-retweet',
        label: 'リノート',
        onClick() {
          api.request('notes/create', {
            renoteId: appearNote.id,
            visibility: appearNote.visibility,
          });
        },
      }, {
        type: 'button',
        icon: 'fas fa-quote-right',
        label: '引用ノート',
        onClick() {
          showModal(NoteEditorDialog, {
            quote: appearNote,
          });
        },
      }]],
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

  const toDraft = () => {
    showModal(Dialog, {
      type: 'text',
      message: 'このノートを削除してもう一度編集しますか？このノートへのリアクション、リノート、返信も全て削除されます。',
      closeByBackdrop: true,
      buttonType: 'yesNo',
      onClick(i) {
        if (i === 0) {
          showModal(NoteEditorDialog, {initial: appearNote});
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
        const [name, host] = emoji.substring(1, emoji.length - 1).split('@');
        if (!isBlacklistedEmojiName(name) && isStaff) {
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
    showModal(NoteEditorDialog, {
      reply: appearNote,
    });
  };

  const onClickRenote = (e: MouseEvent) => {
    openRenoteMenu(e.target as Element);
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
      icon: 'fas fa-copy',
      label: '内容をコピー',
      onClick: copyContent,
    }, {
      type: 'button',
      icon: 'fas fa-link',
      label: 'リンクをコピー',
      onClick: copyLink,
    }]);
    if (appearNote.user.host) {
      items.push([{
        type: 'button',
        icon: 'fas fa-external-link-alt',
        label: 'リモートで見る',
        onClick: showOnRemote,
      }]);
    }
    if (isMyNote) {
      items.push([{
        type: 'button',
        icon: 'fas fa-edit',
        label: '削除して編集',
        onClick: toDraft,
      }, {
        type: 'button',
        icon: 'fas fa-trash-alt',
        label: '削除',
        onClick: deleteNote,
        danger: true,
      }]);
    }
    if (isStaff && !isMyNote) {
      items.push({
        section: 'モデレーション',
        items: [{
          type: 'button',
          icon: 'fas fa-trash-alt',
          label: '削除',
          onClick: deleteNote,
          danger: true,
        }],
      });
    }
    showPopupAt(MenuPopup, e.target as Element, { items });
  };

  useEffect(() => {
    if (!stream) return;
    const noteUpdated = (e: NoteUpdatedEvent) => {
      if (e.id !== p.note.id && e.id !== p.note.renote?.id) return;
      if (e.type === 'deleted') {
        p.onNoteDelete?.call(null);
        return;
      }
      if (!p.onNoteUpdate) return;
      const renote = p.note.renote;
      if (!renote) {
        p.onNoteUpdate(updateNoteViaEvent(p.note, e, userCache?.id));
      } else {
        p.onNoteUpdate(produce(p.note, it => {
          it.renote = updateNoteViaEvent(renote, e, userCache?.id);
        }));
      }
    };
    stream.send('sn', {
      id: appearNote.id,
    });
    stream.on('noteUpdated', noteUpdated);
    return () => {
      stream.off('noteUpdated', noteUpdated);
    };
  }, [stream, appearNote.id, p.note.id]);

  return (
    <Container>
      {renotedUser && !hasContent && (
        <div className="text-dimmed flex f-middle mb-2">
          <i className="fa fa-retweet fa-fw mr-1 text-125"/>
          <img src={renotedUser.avatarUrl} className="circle mr-1" style={{width: '1.5em', height: '1.5em'}} />
          <span>
            <Gpfm plain emojis={renotedUser.emojis} text={getName(renotedUser)} /> さんがリノートしました
          </span>
        </div>
      )}
      {reply && (
        <ReplyWrapper>
          <TinyNoteView note={reply} />
        </ReplyWrapper>
      )}
      <div className="hstack">
        <Avatar user={appearNote.user as UserDetailed} />
        <main style={{flex: 1, minWidth: 0}}>
          <NoteHeader note={appearNote} />
          {appearNote.cw && (
            <aside className="mt-1">
              <Gpfm text={appearNote.cw} emojis={appearNote.emojis} />
              <button className="btn flat text-75 ml-1 text-white" style={{padding: '4px 8px', background: 'var(--tone-4)'}} onClick={() => setCwOpened(!isCwOpened)}>
                {isCwOpened ? '隠す' : `もっと見る(${appearNote.text?.length ?? 0}文字${appearNote.files && appearNote.files.length > 0 ? ', ' + appearNote.files.length + 'ファイル' : ''})`}
              </button>
            </aside>
          )}
          {isVisibleBody && (
            <>
              {appearNote.text && <BodyWrapper className="mt-1">{appearNote.reply && <i className="fas fa-reply text-primary mr-1" />}<Gpfm className="inline" text={appearNote.text} emojis={appearNote.emojis}/></BodyWrapper>}
              {quote && (
                <QuoteContainer className="rounded mt-1 pa-1">
                  <TinyNoteView note={quote} />
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
          <i className="fas fa-reply" />
          {appearNote.repliesCount > 0 && <span className="text-dimmed ml-1">{appearNote.repliesCount < 10 ? appearNote.repliesCount : '9+'}</span>}
        </button>
        <button className="btn flat" onClick={onClickRenote} disabled={!canRenote}>
          <i className="fas fa-retweet" />
          {appearNote.renoteCount > 0 && <span className="text-dimmed ml-1">{appearNote.renoteCount < 10 ? appearNote.renoteCount : '9+'}</span>}
        </button>
        <button className="btn flat" onClick={onClickReaction}>
          <i className="fas fa-smile"></i>
          <i className="fas fa-plus"></i>
        </button>
        <button className="btn flat" onClick={onClickMore}><i className="fas fa-ellipsis-h"></i></button>
      </Commands>
    </Container>
  );
}
