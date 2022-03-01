import { noteVisibilities } from 'misskey-js';
import { toString } from 'misskey-js/built/acct';
import { Note } from 'misskey-js/built/entities';
import React, { KeyboardEvent, MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useMisskeyClient } from '../../hooks/useMisskeyClient';
import { showPopupAt } from '../../scripts/show-popup';
import { useAppSelector } from '../../store';
import TinyNoteView from './note/TinyNoteView';
import MenuPopup from './popup/MenuPopup';
import { VisibilityIcon } from './VisibilityIcon';

const Input = styled.input`
  background: var(--panel) !important;
`;

const Textarea = styled.textarea`
	height: 7em;
  background: var(--panel) !important;
`;

const QuoteContainer = styled.blockquote`
  border: 1px solid var(--tone-4);
  opacity: 0.9;
  pointer-events: none;
`;

export type NoteEditorProp = {
  reply?: Note,
  quote?: Note,
  initial?: Partial<Note>,
  focus?: boolean,
  onSubmit?: (note: Note) => void;
};

export default function NoteEditor(p: NoteEditorProp) {
  const {meta, userCache} = useAppSelector(state => state.session);

  if (!userCache) throw new TypeError();

  const api = useMisskeyClient();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isEnableCw, setEnableCw] = useState(false);
  const [cwMessage, setCwMessage] = useState('');
  const [text, setText] = useState('');
  const [visibility, setVisibility] = useState<typeof noteVisibilities[number]>('public');
  const [isSending, setSending] = useState(false);
  const [quote] = useState(p.quote);
  const [isVisiblePreview, setVisiblePreview] = useState(false);
  
  const {reply} = p;

  const textLimit = (meta?.maxNoteTextLength ?? 500) - text.length;

  const canSend = textLimit > 0 && (
    text.length > 0
  );

  const send = useCallback(() => {
    if (!canSend) return;
    setSending(true);
    api.request('notes/create', {
      text,
      cw: isEnableCw ? cwMessage : null,
      visibility,
      renoteId: quote ? quote.id : undefined,
      replyId: reply ? reply.id : undefined,
    }).then(({createdNote}) => {
      setSending(false);
      setText('');
      if (p.onSubmit) p.onSubmit(createdNote);
    });
    textareaRef.current?.focus();
  }, [text, canSend, isEnableCw, cwMessage, visibility]);

  useEffect(() => {
    if (!reply) return;
    setText('@' + toString(reply.user));
  }, [reply]);

  useEffect(() => {
    if (!p.initial) return;
    setEnableCw(p.initial.cw !== null);
    setCwMessage(p.initial.cw ?? '');
    setText(p.initial.text ?? '');
    setVisibility(p.initial.visibility ?? 'public');
  }, [p.initial]);

  const onClickToggleCw = useCallback(() => {
    setEnableCw(!isEnableCw);
  }, [isEnableCw]);

  const onChangeCw = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    setCwMessage(e.target.value);
  }, []);

  const onChangeText = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>((e) => {
    setText(e.target.value);
  }, []);

  const onClickVisibility = (e: MouseEvent<HTMLButtonElement>) => {
    new Promise<typeof noteVisibilities[number]>(res => showPopupAt(MenuPopup, e.target as Element, { 
      items: [{
        section: '公開範囲を選択してください',
        items: [{
          type: 'button',
          icon: 'fas fa-globe',
          label: 'パブリック',
          onClick: () => res('public'),
        },{
          type: 'button',
          icon: 'fas fa-home',
          label: '未収載',
          onClick: () => res('home'),
        },{
          type: 'button',
          icon: 'fas fa-lock',
          label: 'フォロワー',
          onClick: () => res('followers'),
        },{
          type: 'button',
          icon: 'fas fa-envelope',
          label: 'ダイレクト',
          onClick: () => res('specified'),
        },],
      }],
    })).then((res) => {
      setVisibility(res);
    });
  };

  const onClickSend = useCallback(() => {
    send();
  }, [send]);

  const onKeyDownTextarea = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      send();
    }
  }, [send]);

  useEffect(() => {
    if (!textareaRef.current || !p.focus) return;
    textareaRef.current.focus();
  }, [p.focus, textareaRef.current]);

  return (
    <div>
      <div>
        {reply && (
          <QuoteContainer className="pa-2 rounded">
            <TinyNoteView note={reply} noLink />
          </QuoteContainer>
        )}
        {quote && (
          <QuoteContainer className="pa-2 rounded">
            <TinyNoteView note={quote} noLink />
          </QuoteContainer>
        )}
        <div className="hstack dense mb-1">
          <button className="btn flat mr-1" disabled={true}><i className="fas fa-paperclip fa-fw" /></button>
          <button className={`btn mr-1 ${isEnableCw ? 'primary' : 'flat'}`} onClick={onClickToggleCw}><i className="fas fa-eye-slash fa-fw" /></button>
          <button className="btn flat mr-1" disabled={true}><i className="fas fa-poll-h fa-fw" /></button>
          <button className="btn flat mr-1" disabled={true}><i className="fas fa-bullhorn fa-fw" /></button>
        </div>
        {isEnableCw && (
          <Input type="text" className="input-field ghost mb-2" placeholder="注釈" disabled={isSending} value={cwMessage} onChange={onChangeCw} />
        )}
        <div style={{position: 'relative'}}>
          <Textarea className="input-field ghost" ref={textareaRef} placeholder="好きなことを書きましょう。" disabled={isSending} value={text} onChange={onChangeText} onKeyDown={onKeyDownTextarea} />          
          <span className={`abs-bottom-right-2 text-dimmed  ${textLimit < 0 ? 'text-danger' : ''}`}>{textLimit}</span>
        </div>
      </div>
      <div className="hstack dense mt-1">
        {canSend && (
          <button className="btn flat" onClick={() => setVisiblePreview(f => !f)}>
            <i className={`fas fa-chevron-${isVisiblePreview ? 'up' : 'down'} mr-1`} />
            プレビュー
          </button>
        )}
        <div className="hstack slim ml-auto f-middle">
          <button className="btn flat pa-1" style={{marginLeft: 1}} onClick={onClickVisibility}>
            <VisibilityIcon visibility={visibility} />
          </button>
          <button className="btn primary" disabled={isSending || !canSend} onClick={onClickSend}>
            {isSending ? (
              <><i className="fas fa-spinner fa-spin-pulse fa-fw mr-1"/>送信中…</>
            ) : (
              <><i className="fas fa-paper-plane fa-fw mr-1" />送信</>
            )}
          </button>
        </div>
      </div>
      {canSend && isVisiblePreview && (
        <div className="mt-2">
          <TinyNoteView note={{
            id: 'preview',
            createdAt: new Date().toISOString(),
            text: text,
            cw: isEnableCw ? cwMessage : null,
            visibility,
            user: userCache,
            userId: userCache.id,
            replyId: '',
            renoteId: '',
            files: [],
            fileIds: [],
            reactions: {},
            renoteCount: 0,
            repliesCount: 0,
            emojis: [],
          }} noLink isReply={!!reply} />
        </div>
      )}
    </div>
  );
}
