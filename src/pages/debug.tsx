import React from 'react';
import TestModal from '../components/debug/TestModal';
import { showModal } from '../components/common/modal/show-modal';

export default function DebugPage() {
  const onClick = () => {
    showModal(TestModal);
  };
  return <button className="btn primary" onClick={onClick}>Test Modal</button>;
}
