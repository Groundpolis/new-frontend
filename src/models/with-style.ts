import { HTMLAttributes } from 'react';

export type WithStyle<T extends Record<string, unknown>> = T & Pick<HTMLAttributes<HTMLElement>, 'className' | 'style'>;
