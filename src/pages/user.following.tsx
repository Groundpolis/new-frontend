import React from 'react';
import { User } from '../models/user';

export default function UserFollowingSubPage(p: {user: User}) {
  return (
    <div>ふぉろー {p.user.id}</div>
  );
}
