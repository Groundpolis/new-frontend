import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import { api } from 'misskey-js';
import * as serviceWorker from './serviceWorker';

import 'xeltica-ui/dist/css/xeltica-ui.min.css';
import './style.scss';
import { showModal } from './components/modal/show-modal';
import Dialog from './components/Dialog';
import { setHost, setMeta, setStats } from './store/session';

const host = store.getState().session.host;

if (!host) {
  showModal(Dialog, {
    type: 'input',
    message: 'インスタンス URL を入力してください',
    input: 'misskey.io',
    allowEmpty: false,
    onSubmit(value) {
      store.dispatch(setHost(value));
      initializeReact();
    },
  });
} else {
  initializeReact();
}

async function initializeReact() {
  const {host} = store.getState().session;
  if (!host) throw new TypeError();
  const origin = 'https://' + host;
  const cli = new api.APIClient({origin});
  const [meta, stats] = await Promise.all([
    cli.request('meta', {detail: true}),
    cli.request('stats')
  ]);
  store.dispatch(setMeta(meta));
  store.dispatch(setStats(stats));
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
}
