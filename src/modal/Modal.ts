import { ModalProp } from './ModalProp';

export type ModalFunction<P extends ModalProp = ModalProp> = (prop: P) => JSX.Element;
