import React from 'react';
import { ModalFunction } from './Modal';
import { v4 as uuid } from 'uuid';
import ReactDOM from 'react-dom';
import { ModalProp } from './ModalProp';

export function showModal<P extends ModalProp = ModalProp>(Modal: ModalFunction<P>, props?: P): string {
  const modalParent = document.getElementById('modal');
  const modalEl = document.createElement('div');
  modalEl.id = uuid();
  modalParent?.appendChild(modalEl);
  ReactDOM.render(<Modal {...props as unknown as P} close={() => {
    ReactDOM.unmountComponentAtNode(modalEl);
    modalParent?.removeChild(modalEl);
  }}/>, modalEl);
  return modalEl.id;
}