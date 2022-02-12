import { Note } from 'misskey-js/built/entities';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import styled from 'styled-components';
import Modal, { ModalProp } from '../Modal';
import NoteEditor from '../NoteEditor';

export type NoteEditorDialogProp = ModalProp & {
  reply?: Note,
  quote?: Note,
  initial?: Partial<Note>,
};

const Backdrop = styled.div`
  background: var(--bg);
`;

export default function NoteEditorDialog(prop: NoteEditorDialogProp) {
  return (
    <Modal close={prop.close} closeByBackdrop align="top" full innerClassName="fluid">
      <Backdrop>
        <header className="text-125 flex f-middle">
          <button className="btn flat pa-2" onClick={prop.close}><FaArrowLeft size="18" /></button>
          投稿を作成
        </header>
        <div className="pa-2">
          <NoteEditor onSubmit={prop.close}/>
        </div>
      </Backdrop>
    </Modal>
  );
}
