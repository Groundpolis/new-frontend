import React from 'react';
import { useState } from 'react';
import { useMemo } from 'react';

import './Modal.scss';
import { ModalProp } from './modal/ModalProp';

export type DialogProp = ModalProp & {
  title?: string;
  message: string;
  type: 'text' | 'input';
  buttonType?: DialogButtonType;
  customButtons?: DialogButton[];
  input?: string;
  allowEmpty: boolean;
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

export default function Dialog(p: DialogProp) {
  const [inputValue, setInputValue] = useState(p.type === 'input' ? p.input ?? '' : '');
  const inner = useMemo(() => {
    switch (p.type) {
    case 'text':
      return (
        <div className="hstack">
          {generateButton(p.buttonType, p.customButtons).map((b, i) => (
            <button className={`btn ${b.class ?? 'flat'}`} key={i} onClick={() => { if (p.onClick) p.onClick(i); }}>
              {b.text}
            </button>
          ))}
        </div>
      );
    case 'input':
      return (
        <div className="vstack">
          <input type="text" className="input-field" value={inputValue} onChange={e => setInputValue(e.target.value)}/>
          <div className="hstack">
            <button className="btn flat" onClick={() => {
              p.close();
            }}>キャンセル</button>
            <button className="btn primary" disabled={!p.allowEmpty && !inputValue} onClick={() => {
              if (p.onSubmit) p.onSubmit(inputValue);
              p.close();
            }}>送信</button>
          </div>
        </div>
      );
      break;
    }
  }, [p.close, p.message, p.onSubmit, p.title, p.type, inputValue]);
  return (
    <div className="gp-modal" onClick={() => {if (p.closeByBackdrop) p.close();}}>
      <div className="card shadow-3" onClick={e => e.stopPropagation()}>
        <div className="body">
          {p.title && <h1>{p.title}</h1>}
          <p>{p.message}</p>
          {inner}
        </div>
      </div>
    </div>
  );
}
