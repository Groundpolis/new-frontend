import { Note } from 'misskey-js/built/entities';
import React, { MouseEvent, useCallback, useMemo, useState } from 'react';
import { FaSmile } from 'react-icons/fa';
import styled from 'styled-components';
import pantaNote from '../assets/panta.min.json';
import ActionBar from '../components/common/action-bar/ActionBar';
import Dialog from '../components/common/dialogs/Dialog';
import { ImageGrid } from '../components/common/note/NoteMedia';
import NoteView from '../components/common/note/NoteView';
import EmojiMartPicker from '../components/common/popup/EmojiMartPicker';
import { showModal } from '../scripts/show-modal';
import { showPopupAt } from '../scripts/show-popup';


const ImageGridContainer = styled.div`
  width: 400px;
  height: 300px;
  background: var(--panel);
`;

export default function DebugPage() {
  const onClickOpenEmojiPicker = (e: MouseEvent) => {
    showPopupAt(EmojiMartPicker, e.target as Element, {
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
  const [gridCount, setGridCount] = useState(1);
  const onClickCreateNotes = useCallback(() => {
    setNotesCount(input);
  }, [input, notesCount]);
  const note = useMemo(() => <NoteView note={pantaNote as unknown as Note} />, []);
  const notes = useMemo(() => new Array(notesCount).fill(note) as JSX.Element[], [note, notesCount]);
  return (
    <>
      <ActionBar>
        <h1>デバッグモード</h1>
      </ActionBar>
      <div className="container vstack">
        <article>
          <h2 className="underline">UI Test</h2>
          <h3>絵文字ピッカー</h3>
          <button className="btn" onClick={onClickOpenEmojiPicker}><FaSmile /></button>
          <h3>ImageGrid</h3>
          <input type="number" className="input-field mb-2" value={gridCount} placeholder="グリッド数" min={1} max={4} onChange={e => setGridCount(parseInt(e.target.value))} />
          <ImageGridContainer>
            <ImageGrid className={'layout-' + gridCount}>
              {new Array(gridCount).fill(<img className="rounded block" src="https://placekitten.com/320/180" />)}
            </ImageGrid>
          </ImageGridContainer>
        </article>
        <article>
          <h2 className="underline">負荷試験</h2>
          <div className="vstack">
            <div className="lift down pa-1 hgroup" style={{width: 360}}>
              <input type="number" className="input-field ghost" value={input} placeholder="ノート数" onChange={e => setInput(parseInt(e.target.value))} />
              <button className="btn lift" style={{width: 96}} onClick={onClickCreateNotes}>表示</button>
            </div>
            {notes}
          </div>
        </article>
      </div>
    </>
  );
}
