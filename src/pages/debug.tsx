import React from 'react';
import TestDialog from '../components/common/dialogs/TestModal';
import { showModal } from '../scripts/show-modal';

export default function DebugPage() {
  const onClick = () => {
    showModal(TestDialog);
  };
  return <button className="btn primary" onClick={onClick}>Test Modal</button>;
}
