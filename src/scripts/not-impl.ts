import Dialog from '../components/common/dialogs/Dialog';
import { showModal } from './show-modal';

export function notImpl(e?: React.BaseSyntheticEvent) {
  showModal(Dialog, {
    type: 'text',
    title: 'ð§å·¥äºä¸­ã§ãð§',
    message: 'ã¼ã¡ã¼ã¡ã¨å®è£ä¸­ã§ãã\nããããããå¾ã¡ãã ããðð»ââï¸',
    buttonType: 'ok',
    closeByBackdrop: true,
  });
  e?.preventDefault();
}