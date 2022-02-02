import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { v4 as uuid } from 'uuid';

import { PopupFunction, PopupProp } from '../components/common/Popup';
import { store } from '../store';

export function showPopup<P extends PopupProp = PopupProp>(Popup: PopupFunction<P>, props?: Omit<P, 'close'>): string {
  const modalParent = document.getElementById('modal');
  const modalEl = document.createElement('div');
  modalEl.id = uuid();
  modalParent?.appendChild(modalEl);
  const vm = (
    <Provider store={store}>
      <Popup {...props as unknown as P} close={() => {
        ReactDOM.unmountComponentAtNode(modalEl);
        modalParent?.removeChild(modalEl);
      }}/>
    </Provider>
  );
  ReactDOM.render(vm, modalEl);
  return modalEl.id;
}
