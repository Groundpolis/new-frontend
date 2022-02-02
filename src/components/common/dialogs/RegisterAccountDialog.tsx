import React, { useState } from 'react';
import { FaAt } from 'react-icons/fa';
import { useAppSelector } from '../../../store';
import Modal from '../Modal';
import { ModalProp } from '../Modal';

export default function RegisterAccountDialog(p: ModalProp) {
  const [isAgreeTos, setAgreeTos] = useState(false);
  const [isReadTos, setReadTos] = useState(false);
  const {meta} = useAppSelector(state => state.session);

  if (!meta) throw TypeError();

  return (
    <Modal close={p.close} closeByBackdrop innerClassName="card shadow-3">
      <div className="body">
        <h1>新規登録</h1>
        {!!meta.tosUrl && (
          <div className={`mb-2 ${isAgreeTos ? 'gp-disabled' : ''}`}>
            <p>
              まず、
              <a href={meta.tosUrl} target="_blank" rel="noopener noreferrer" onClick={() => setReadTos(true)}>
                利用規約
              </a>
              をよく読んで同意してください。
            </p>
            <button className="btn block mt-2" disabled={!isReadTos} onClick={() => setAgreeTos(true)}>
              利用規約に同意します
            </button>
          </div>
        )}
        <div className={(!isAgreeTos && !!meta.tosUrl) ? 'gp-disabled' : ''}>
          <label className="input-field">
            ユーザー名
            <input type="text" className="input-field" />
          </label>
          <label className="input-field">
            パスワード
            <input type="password" />
          </label>
          <label className="input-field">
            パスワード(再入力)
            <input type="password" />
          </label>
          <button className="btn primary mt-2 block fluid">はじめる</button>
        </div>
      </div>
    </Modal>
  );
}
