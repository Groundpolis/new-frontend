import React, { MouseEvent, useCallback, useMemo, useState } from 'react';
import TestDialog from '../components/common/dialogs/TestModal';
import { showModal } from '../scripts/show-modal';

import pantaNote from '../assets/panta.min.json';
import NoteView from '../components/common/note/NoteView';
import ActionBar from '../components/common/action-bar/ActionBar';
import { showPopupAt } from '../scripts/show-popup';
import EmojiPicker from '../components/common/popup/EmojiPicker';
import Dialog from '../components/common/dialogs/Dialog';

export default function DebugPage() {
  const onClickOpenEmojiPicker = (e: MouseEvent) => {
    showPopupAt(EmojiPicker, e.target as Element, {
      onChoose(e) {
        showModal(Dialog, {
          type: 'text',
          message: `${e} が選択されました`,
          buttonType: 'ok',
        });
      },
    });
  };

  const [input, setInput] = useState(0);
  const [notesCount, setNotesCount] = useState(0);
  const onClickCreateNotes = useCallback(() => {
    setNotesCount(input);
  }, [input, notesCount]);
  const note = useMemo(() => <NoteView note={pantaNote as any} />, []);
  const notes = useMemo(() => new Array(notesCount).fill(note) as JSX.Element[], [note, notesCount]);
  return (
    <>
      <ActionBar>
        <h1>デバッグモード</h1>
      </ActionBar>
      <div className="container">
        <h2>UI Test</h2>
        <div className="mb-2">
          <button className="btn primary" onClick={onClickOpenEmojiPicker}>絵文字ピッカー</button>
        </div>
        <h2>負荷試験</h2>
        <div className="vstack">
          <div className="lift down pa-1 hgroup" style={{width: 360}}>
            <input type="number" className="input-field ghost" value={input} placeholder="ノート数" onChange={e => setInput(parseInt(e.target.value))} />
            <button className="btn lift" style={{width: 96}} onClick={onClickCreateNotes}>表示</button>
          </div>
          {notes}
        </div>
      </div>
    </>
  );
}
