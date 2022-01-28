import React from 'react';

import './Modal.scss';
import { ModalProp } from './modal/ModalProp';

export default function TestModal({close}: ModalProp) {
  return (
    <div className="gp-modal" onClick={close}>
      <div className="card shadow-3" onClick={e => e.stopPropagation()}>
        <div className="body">
          <h1>Test</h1>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
    </div>
  );
}
