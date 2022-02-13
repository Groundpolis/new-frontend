import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { ModalFunction, ModalProp } from '../components/common/Modal';
import { store } from '../store';


export function showModal<P extends ModalProp = ModalProp>(Modal: ModalFunction<P>, props?: Omit<P, 'close'>): string {
  const modalParent = document.getElementById('modal');
  const modalEl = document.createElement('div');
  modalEl.id = uuid();
  modalParent?.appendChild(modalEl);
  const vm = (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <Modal {...props as unknown as P} close={() => {
          ReactDOM.unmountComponentAtNode(modalEl);
          modalParent?.removeChild(modalEl);
        }}/>
      </BrowserRouter>
    </ReduxProvider>
  );
  ReactDOM.render(vm, modalEl);
  return modalEl.id;
}
