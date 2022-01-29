import { User } from 'misskey-js/built/entities';

export interface MiAuthResponse {
  token: string;
  user: User;
}