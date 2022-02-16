import React from 'react';
import { PropsWithMeta } from '../../models/PropsWithMeta';
import { initSession } from '../../scripts/init-session';

export default function VersionInfo({meta}: PropsWithMeta) {
  return (
    <p className="text-75 text-dimmed" onClick={initSession}>
      Groundpolis {meta.version}<br />
      Made with <i className="fas fa-heart text-red"/> by Groundpolis HQ
    </p>
  );
}
