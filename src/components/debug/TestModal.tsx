import React from 'react';
import Modal from '../common/modal/Modal';

import { ModalProp } from '../common/modal/ModalProp';

export default function TestModal(prop: ModalProp) {
  return (
    <Modal close={prop.close} closeByBackdrop innerClassName="card shadow-3">
      <div className="body">
        <h1>Test</h1>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
    </Modal>
  );
}
