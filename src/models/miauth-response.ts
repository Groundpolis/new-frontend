import { User, UserDetailed } from 'misskey-js/built/entities';

export interface MiAuthResponse {
  token: string;
  user: UserDetailed;
}