import React from 'react';
import { PropsWithMeta } from '../../models/PropsWithMeta';

export default function DisabledRegisterCard(p: PropsWithMeta) {
  return (
    <div className="alert bg-warn lift down mb-2">
      <div className="text-bold mb-1">
        <i className="fas fa-exclamation-triangle icon"/>
        現在、登録はできません。
      </div>
      <div className="ml-1">{p.meta.disableInvitationReason}</div>
    </div>
  );
}
