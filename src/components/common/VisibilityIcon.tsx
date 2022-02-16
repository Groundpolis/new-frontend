import { noteVisibilities } from 'misskey-js';
import React from 'react';

type VisibilityIconProp = {
  visibility: typeof noteVisibilities[number];
  hiddenGlobal?: boolean;
};

export const VisibilityIcon = (p: VisibilityIconProp) => {
  switch(p.visibility) {
  case 'public': return p.hiddenGlobal ? null : <i className="fas fa-globe" />;
  case 'home': return <i className="fas fa-home" />;
  case 'followers': return <i className="fas fa-lock" />;
  case 'specified': return <i className="fas fa-envelope" />;
  default: return <i className="fas fa-question" />;
  }
};