import React from 'react';
import Modal, { ModalProp } from '../Modal';


export default function LoginDialog(p: ModalProp) {
  return (
    <Modal close={p.close} closeByBackdrop innerClassName="card shadow-3">
      <div className="body">
        <h1>ログイン</h1>
        <label className="input-field">
            ユーザー名
          <input type="text" className="input-field" />
        </label>
        <label className="input-field">
            パスワード
          <input type="password" />
        </label>
        <button className="btn primary mt-2 block fluid">ログイン</button>
      </div>
    </Modal>
  );
}
