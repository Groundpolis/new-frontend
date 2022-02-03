import Dialog from '../components/common/dialogs/Dialog';
import { showModal } from './show-modal';

export function notImpl(e?: React.BaseSyntheticEvent) {
  showModal(Dialog, {
    type: 'text',
    title: '🚧工事中です🚧',
    message: 'ぼちぼちと実装中です。\nもうすこしお待ちください🙇🏻‍♂️',
    buttonType: 'ok',
    closeByBackdrop: true,
  });
  e?.preventDefault();
}