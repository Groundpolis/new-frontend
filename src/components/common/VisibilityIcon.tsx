import React from 'react';
import { noteVisibilities } from 'misskey-js';
import { FaGlobe, FaHome, FaLock, FaEnvelope, FaQuestion } from 'react-icons/fa';

type VisibilityIconProp = {
  visibility: typeof noteVisibilities[number];
  hiddenGlobal?: boolean;
};

export const VisibilityIcon = (p: VisibilityIconProp) => {
  switch(p.visibility) {
  case 'public': return p.hiddenGlobal ? null : <FaGlobe />;
  case 'home': return <FaHome />;
  case 'followers': return <FaLock />;
  case 'specified': return <FaEnvelope />;
  default: return <FaQuestion />;
  }
};