import React from 'react';
import { User } from '../models/user';

export default function UserTimelineSubPage(p: {user: User}) {
  return (
    <div>たいむらいん {p.user.id}</div>
  );
}
