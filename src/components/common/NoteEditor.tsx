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

const Textarea = styled.textarea`
	height: 7em;
`;

const QuoteContainer = styled.blockquote`
  border: 1px solid var(--tone-4);
  opacity: 0.5;
`;

export type NoteEditorProp = {
  reply?: Note,
  quote?: Note,
  initial?: Partial<Note>,
  onSubmit?: (note: Note) => void;
};

export default function NoteEditor(p: NoteEditorProp) {
  const {meta} = useAppSelector(state => state.session);

  const api = useMisskeyClient();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isEnableCw, setEnableCw] = useState(false);
  const [cwMessage, setCwMessage] = useState('');
  const [text, setText] = useState('');
  const [visibility, setVisibility] = useState<typeof noteVisibilities[number]>('public');
  const [isSending, setSending] = useState(false);
  const [quote] = useState(p.quote);
  
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

  const onClickEnableCw = useCallback(() => {
    setEnableCw(true);
  }, []);

  const onClickDisableCw = useCallback(() => {
    setEnableCw(false);
  }, []);

  const onChangeCw = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    setCwMessage(e.target.value);
  }, []);

  const onChangeText = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>((e) => {
    setText(e.target.value);
  }, []);

  const onClickVisibility = (e: MouseEvent<HTMLButtonElement>) => {
    new Promise<typeof noteVisibilities[number]>(res => showPopupAt(MenuPopup, e.target as Element, {
      items: [[{
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
      },]],
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

  return (
    <div>
      <div className="vstack">
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
        {isEnableCw ? (
          <div className="hstack dense">
            <button className="btn flat pa-1 mr-1" onClick={onClickDisableCw} disabled={isSending}><i className="fas fa-times fa-fw" /></button>
            <input type="text" className="input-field" placeholder="注釈" disabled={isSending} value={cwMessage} onChange={onChangeCw} />
          </div>
        ) : (
          <button className="btn text-left px-1 fluid" disabled={isSending} onClick={onClickEnableCw}>
            <i className="fas fa-eye-slash mr-1"/>投稿内容を伏せる
          </button>
        )}
        <Textarea className="input-field" ref={textareaRef} placeholder="好きなことを書きましょう。" disabled={isSending} value={text} onChange={onChangeText} onKeyDown={onKeyDownTextarea} />
      </div>
      <div className="hstack dense mt-2">
        <button className="btn flat text-125 pa-1 mr-1" disabled={true}><i className="fas fa-plus-circle fa-fw" /></button>
        <button className="btn flat text-125 pa-1 mr-1" disabled={true}><i className="fas fa-poll-h fa-fw" /></button>
        <button className="btn flat text-125 pa-1 mr-1" disabled={true}><i className="fas fa-bullhorn fa-fw" /></button>
        <div className="hstack dense ml-auto f-middle">
          <b className={`text-dimmed ${textLimit < 0 ? 'text-danger' : ''}`}>{textLimit}</b>
          <div className="hgroup ml-1">
            <button className="btn primary" disabled={isSending || !canSend} onClick={onClickSend}>
              <VisibilityIcon visibility={visibility} />
              <span className="ml-1">{isSending ? '送信中…' : '送信'}</span>
            </button>
            <button className="btn primary pa-1" style={{marginLeft: 1}} onClick={onClickVisibility}>
              <i className="fas fa-chevron-down" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
