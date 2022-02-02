import { Acct } from 'misskey-js';
import React from 'react';

export type UserNameViewProp = {
  user: Acct;
};

export default function UserNameView({user}: UserNameViewProp) {
  return (
    <>
      <span className="item text-dimmed text-normal ml-1">@{user.username}</span>
      {user.host && <span className="item" style={{opacity: 0.5}}>@{user.host}</span>}
    </>
  );
}
