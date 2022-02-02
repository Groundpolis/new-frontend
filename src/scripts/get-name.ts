import { User } from '../models/user';

export const getName = (user: User) => user.name || user.username;
