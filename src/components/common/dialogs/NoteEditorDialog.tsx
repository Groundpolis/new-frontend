import { Note } from 'misskey-js/built/entities';
import React from 'react';
import styled from 'styled-components';
import { useBreakpoints } from '../../../hooks/useBreakpoints';
import Modal, { ModalProp } from '../Modal';
import NoteEditor, { NoteEditorProp } from '../NoteEditor';

export type NoteEditorDialogProp = ModalProp & NoteEditorProp;

const Backdrop = styled.div`
  background: var(--bg);
`;

export default function NoteEditorDialog(prop: NoteEditorDialogProp) {
  const {isMobile} = useBreakpoints();
  const onSubmit = (note: Note) => {
    if (prop.onSubmit) prop.onSubmit(note);
    prop.close();
  };

  return (
    <Modal close={prop.close} closeByBackdrop align="top" full={isMobile} innerClassName={isMobile ? 'fluid' : ''}>
      <Backdrop className={isMobile ? '' : 'rounded'} style={isMobile ? {} : {width: 700}}>
        <header className="text-125 flex f-middle">
          <button className="btn flat pa-2" onClick={prop.close}><i className="fa-arrow-left" /></button>
          {prop.quote ? '引用' : prop.reply ? '返信' : '投稿を作成'}
        </header>
        <div className="pa-2">
          <NoteEditor {...prop} onSubmit={onSubmit}/>
        </div>
      </Backdrop>
    </Modal>
  );
}
