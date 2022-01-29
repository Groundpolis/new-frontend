import React, { KeyboardEvent, useEffect, useRef } from 'react';
import { useState } from 'react';
import Modal from '../modal/Modal';

import { ModalProp } from '../modal/ModalProp';

export type DialogProp = ModalProp & {
  title?: string;
  message: string;
  type: 'text' | 'input';
  buttonType?: DialogButtonType;
  customButtons?: DialogButton[];
  input?: string;
  allowEmpty?: boolean;
  onClick?: (buttonIndex: number) => void;
  onSubmit?: (value: string) => void;
};

export type DialogButtonType = 'ok' | 'yesNo' | 'yesNoCancel' | 'okCancel' | 'custom';

export type DialogButton = {
  text: string;
  class?: 'primary' | 'success' | 'info' | 'warn' | 'danger';
};

const OK: DialogButton = {
  class: 'primary',
  text: 'OK',
};

const YES: DialogButton = {
  class: 'primary',
  text: 'はい',
};

const NO: DialogButton = {
  text: 'いいえ',
};

const CANCEL: DialogButton = {
  text: 'キャンセル',
};

const generateButton = (type?: DialogButtonType, customButtons?: DialogButton[]): DialogButton[] => {
  switch (type) {
  case 'ok':
    return [OK];
  case 'okCancel':
    return [OK, CANCEL];
  case 'yesNo':
    return [YES, NO];
  case 'yesNoCancel':
    return [YES, NO, CANCEL];
  case 'custom':
    if (!customButtons) throw new TypeError('customButtons is undefined');
    return customButtons;
  }
  throw new TypeError();
};

function InnerText(p: DialogProp) {
  return (
    <div className="hstack">
      {generateButton(p.buttonType, p.customButtons).map((b, i) => (
        <button className={`btn ${b.class ?? 'flat'}`} key={i} onClick={() => { if (p.onClick) p.onClick(i); p.close(); }}>
          {b.text}
        </button>
      ))}
    </div>
  );
}

function InnerInput(p: DialogProp) {
  const [inputValue, setInputValue] = useState(p.type === 'input' ? p.input ?? '' : '');

  const canSend = p.allowEmpty || inputValue;

  const inputRef = useRef<HTMLInputElement>(null);

  const submit = () => {
    if (p.onSubmit && canSend) p.onSubmit(inputValue);
    p.close();
  };

  const keypress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') submit();
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [inputRef.current]);

  return (
    <div className="vstack">
      <input type="text" className="input-field" ref={inputRef} value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyPress={keypress}/>
      <div className="hstack">
        <button className="btn flat" onClick={p.close}>キャンセル</button>
        <button className="btn primary" disabled={!canSend} onClick={submit}>送信</button>
      </div>
    </div>
  );
}

export default function Dialog(p: DialogProp) {
  return (
    <Modal close={p.close} innerClassName="card shadow-3">
      <div className="body">
        {p.title && <h1 className="mt-1">{p.title}</h1>}
        <p>{p.message}</p>
        {p.type === 'text' ? (
          <InnerText {...p}/>
        ) : p.type === 'input' ? (
          <InnerInput {...p}/>
        ) : <p>???</p>}
      </div>
    </Modal>
  );
}
