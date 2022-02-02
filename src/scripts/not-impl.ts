import Dialog from '../components/common/dialogs/Dialog';
import { showModal } from '../components/common/note/show-modal';

export function notImpl(e?: React.BaseSyntheticEvent) {
  showModal(Dialog, {
    type: 'text',
    title: '工事中です',
    message: 'もうすぐで使えるようになります🙏',
    buttonType: 'ok',
    closeByBackdrop: true,
  });
  e?.preventDefault();
}