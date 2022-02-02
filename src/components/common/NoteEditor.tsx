import React, { MouseEvent, MouseEventHandler, useCallback, useState } from 'react';
import styled from 'styled-components';
import { FaChevronDown, FaEnvelope, FaEyeSlash, FaGlobe, FaHome, FaLock, FaRegLaugh, FaTimes } from 'react-icons/fa';
import { useAppSelector } from '../../store';
import { VisibilityIcon } from './VisibilityIcon';
import { noteVisibilities } from 'misskey-js';
import { notImpl } from '../../scripts/not-impl';
import { useMisskeyClient } from '../../hooks/useMisskeyClient';
import { showPopup, showPopupAt } from '../../scripts/show-popup';
import MenuPopup from './popup/MenuPopup';

const CwButton = styled.button`
	border-color: var(--dimmed) !important;
`;

const Textarea = styled.textarea`
	height: 7em;
`;

export default function NoteEditor() {
  const {meta} = useAppSelector(state => state.session);

  const api = useMisskeyClient();

  const [isEnableCw, setEnableCw] = useState(false);
  const [cwMessage, setCwMessage] = useState('');
  const [text, setText] = useState('');
  const [isSending, setSending] = useState(false);
  const [visibility, setVisibility] = useState<typeof noteVisibilities[number]>('public');

  const textLimit = (meta?.maxNoteTextLength ?? 500) - text.length;

  const canSend = textLimit > 0 && (
    text.length > 0
  );

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
        icon: FaGlobe,
        label: 'パブリック',
        onClick: () => res('public'),
      },{
        type: 'button',
        icon: FaHome,
        label: '未収載',
        onClick: () => res('home'),
      },{
        type: 'button',
        icon: FaLock,
        label: 'フォロワー',
        onClick: () => res('followers'),
      },{
        type: 'button',
        icon: FaEnvelope,
        label: 'ダイレクト',
        onClick: () => res('specified'),
      },]],
    })).then((res) => {
      setVisibility(res);
    });
  };

  const onClickSend = useCallback(() => {
    setSending(true);
    api.request('notes/create', {
      text,
      cw: isEnableCw ? cwMessage : null,
      visibility,
    }).then(() => {
      setSending(false);
      setText('');
    });
  }, [text, isEnableCw, cwMessage, visibility]);

  return (
    <div>
      {isEnableCw ? (
        <div className="hstack dense">
          <button className="btn flat pa-1 mr-1" onClick={onClickDisableCw} disabled={isSending}><FaTimes /></button>
          <input type="text" className="input-field" placeholder="注釈" disabled={isSending} value={cwMessage} onChange={onChangeCw} />
        </div>
      ) : (
        <CwButton className="btn text-left px-1 text-dimmed" disabled={isSending} onClick={onClickEnableCw}>
          <FaEyeSlash/> 投稿内容を伏せる
        </CwButton>
      )}
      <Textarea className="input-field mt-2" disabled={isSending} placeholder="好きなことを書きましょう。" value={text} onChange={onChangeText} />
      <div className="hstack dense mt-2">
        <button className="btn flat" disabled={isSending}><FaRegLaugh /></button>
        <div className="hstack ml-auto f-middle">
          <b className={`text-dimmed ${textLimit < 0 ? 'text-danger' : ''}`}>{textLimit}</b>
          <div className="hgroup">
            <button className="btn primary" disabled={isSending || !canSend} onClick={onClickSend}>
              <VisibilityIcon visibility={visibility} />
              <span className="ml-1">{isSending ? '送信中…' : '送信'}</span>
            </button>
            <button className="btn primary pa-1" style={{marginLeft: 1}} onClick={onClickVisibility}>
              <FaChevronDown />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
