import React from 'react';
import { User } from '../models/user';

export default function UserFollowersSubPage(p: {user: User}) {
  return (
    <div>ふぉろわー {p.user.id}</div>
  );
}
