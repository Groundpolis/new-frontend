import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { PropsWithMeta } from '../../models/PropsWithMeta';
import { initSession } from '../../scripts/init-session';

export default function VersionInfo({meta}: PropsWithMeta) {
  return (
    <p className="text-75 text-dimmed" onClick={initSession}>
      Groundpolis {meta.version}<br />
      Made with <FaHeart className="text-red"/> by Groundpolis HQ
    </p>
  );
}
