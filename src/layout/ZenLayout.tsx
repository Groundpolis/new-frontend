import React, { PropsWithChildren } from 'react';
import { useTheme } from '../hooks/useTheme';


export default function ZenLayout(prop: PropsWithChildren<unknown>) {
  useTheme();
  return (
    <div className="fluid" style={{minWidth: 0}}>{prop.children}</div>
  );
}
