import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './store';
import { Provider as ReduxProvider } from 'react-redux';
import { api } from 'misskey-js';
import * as serviceWorker from './serviceWorker';

import { showModal } from './components/common/note/show-modal';
import Dialog from './components/common/dialogs/Dialog';
import BlueScreen from './components/common/BlueScreen';
import { setHost, setMeta, setStats, setUserCache } from './store/session';

import 'xeltica-ui/dist/css/xeltica-ui.min.css';
import './style.scss';

const host = store.getState().session.host;

if (!host) {
  showModal(Dialog, {
    type: 'input',
    message: 'お使いのサーバーURLを入力してください',
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
  const {host, token} = store.getState().session;
  if (!host) throw new TypeError();
  const origin = 'https://' + host;
  const cli = new api.APIClient({origin});
  try {
    cli.request('stats').then(s => store.dispatch(setStats(s)));
    if (token) {
      cli.request('i', {}, token).then(u => store.dispatch(setUserCache(u)));
    }
    store.dispatch(setMeta(await cli.request('meta', {detail: true})));
    ReactDOM.render(
      <React.StrictMode>
        <ReduxProvider store={store}>
          <App />
        </ReduxProvider>
      </React.StrictMode>,
      document.getElementById('root')
    );
  } catch(e) {
    if (!(e instanceof Error)) return;
    ReactDOM.render(<BlueScreen stack={e.stack} message={e.message}/>, document.getElementById('root'));
  }

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
}
