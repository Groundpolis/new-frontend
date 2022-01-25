import React from 'react';
import TestModal from '../components/TestModal';
import { showModal } from '../modal/show-modal';

export default function DebugPage() {
  const onClick = () => {
    showModal(TestModal);
  };
  return <button className="btn primary" onClick={onClick}>Test Modal</button>;
}
