import { Notification } from 'misskey-js/built/entities';
import React from 'react';
import { getName } from '../../scripts/get-name';
import EmojiView from './EmojiView';
import { Gpfm } from './Gpfm';
import NoteView from './note/NoteView';

export function NotificationView({ data }: { data: Notification; }) {
  switch (data.type) {
  case 'renote': return (
    <div className="card">
      <div className="body">
        <h1><Gpfm plain text={getName(data.user)} /> さんがリノートしました</h1>
        <p><Gpfm text={data.note.cw ? data.note.cw : data.note.text ?? 'No Content'} /></p>
      </div>
    </div>
  );
  case 'follow': return (
    <div className="card">
      <div className="body">
        <h1><Gpfm plain text={getName(data.user)} /> さんにフォローされました</h1>
      </div>
    </div>
  );
  case 'reaction': return (
    <div className="card">
      <div className="body">
        <h1><Gpfm plain text={getName(data.user)} /> さんが「<EmojiView emoji={data.reaction} />」とリアクションしました</h1>
      </div>
    </div>
  );
  case 'followRequestAccepted': return (
    <div className="card">
      <div className="body">
        <h1><Gpfm plain text={getName(data.user)} /> さんがフォローを承認しました</h1>
      </div>
    </div>
  );
  case 'receiveFollowRequest': return (
    <div className="card">
      <div className="body">
        <h1><Gpfm plain text={getName(data.user)} /> さんからフォローリクエストが届きました</h1>
      </div>
    </div>
  );
  case 'mention':
  case 'reply':
  case 'quote': {
    return <NoteView note={data.note} />;
  }
  case 'app': return (
    <div className="card">
      <div className="body">
        <h1>{data.header}</h1>
        <p><Gpfm text={data.body} /></p>
      </div>
    </div>
  );
  default: return (
    <div className="card">
      <div className="body">
        <h1>不明な通知: {data.type}</h1>
      </div>
    </div>
  );
  }
}
