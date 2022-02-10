import { toString } from 'misskey-js/built/acct';
import { Notification, UserDetailed } from 'misskey-js/built/entities';
import React from 'react';
import { FaCheck, FaClock, FaIdCardAlt, FaPlus, FaPollH, FaRetweet, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { animationFade } from '../../animation';
import { getName } from '../../scripts/get-name';
import Avatar from './Avatar';
import EmojiView from './EmojiView';
import { Gpfm } from './Gpfm';
import NoteView from './note/NoteView';
import TimeView from './TimeView';

const AppIcon = styled.img<{slim?: boolean}>`
  width: 42px;
  height: 42px;
`;

const IconContainer = styled.div<{slim?: boolean}>`
  position: relative;
  width: 42px;
  height: 42px;
`;

const SubIcon = styled.div<{slim?: boolean}>`
  display: flex;
  position: absolute;
  right: -4px;
  bottom: -4px;
  width: 22px;
  height: 22px;
  border: 2px solid var(--panel);
  background: var(--skyblue);
  color: var(--white);
  border-radius: 100%;
  z-index: 10;
  align-items: center;
  justify-content: center;
  box-sizing: content-box;
  &.renote {
    background: var(--green);
  }
  &.like {
    background: var(--pink);
  }
  &.reaction {
    background: var(--panel);
  }
  > * {
    font-size: 16px;
  }
`;

const AppBody = styled.div`
  padding: var(--margin);
  border-radius: var(--radius);
  background: var(--bg);
`;

const Container = styled.div`
  ${animationFade};
  > * {
    min-width: 0;
  }
`;

const Article = styled.div`
  flex: 1;
  > header {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    > span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

export function NotificationView({ data, slim }: { data: Notification; slim?: boolean }) {
  if (data.type === 'quote' || data.type === 'reply' || data.type === 'mention') {
    return <NoteView note={data.note} />;
  }

  const title = (() => {
    if (data.type === 'app') return <span>{data.header ?? null}</span>;
    const name = <Link style={{color: 'var(--fg)'}} to={`/@${toString(data.user)}`}><Gpfm plain text={getName(data.user)} emojis={data.user.emojis} /></Link>;
    switch (data.type) {
    case 'reaction': return <span>{name}がリアクションしました</span>;
    case 'renote': return <span>{name}がリノートしました</span>;
    case 'follow': return <span>{name}にフォローされました</span>;
    case 'followRequestAccepted': return <span>{name}がフォローを承認しました</span>;
    case 'groupInvited': return <span>{name}がグループに招待しました</span>;
    case 'receiveFollowRequest': return <span>{name}からフォローリクエストを受け取りました</span>;
    case 'pollVote': return <span>{name}が投票しました</span>;
    }
  })();

  const body = (() => {
    if (data.type === 'app') return <AppBody><Gpfm text={data.body} /></AppBody>;
    switch (data.type) {
    case 'reaction':
    case 'renote':
    case 'pollVote': {
      const note = data.note;
      return <Link to={`/notes/${note.id}`} className="text-dimmed">{note.text || `${note.cw} [もっと見る]`}</Link>;
    }
    case 'receiveFollowRequest': return (
      <div className="vgroup fluid">
        <button className="btn primary"><FaCheck /></button>
        <button className="btn danger"><FaTimes /></button>
      </div>
    );
    case 'follow': return (
      <Link to={`/@${toString(data.user)}`} className="btn">プロフィールを確認する</Link>
    );
    }
    return null;
  })();

  const icon = data.type === 'app' ? (
    <AppIcon src={data.icon ?? undefined} className="rounded" />
  ) : (
    <Avatar size={42} user={data.user as UserDetailed} />
  );

  const subIcon = (() => {
    switch (data.type) {
    case 'follow': return <FaPlus />;
    case 'followRequestAccepted': return <FaCheck />;
    case 'groupInvited': return <FaIdCardAlt />;
    case 'pollVote': return <FaPollH />;
    case 'reaction': return <EmojiView emoji={data.reaction} customEmojis={data.note.emojis} normal />;
    case 'receiveFollowRequest': return <FaClock />;
    case 'renote': return <FaRetweet />;
    }
  })();

  return (
    <Container className="hstack">
      <IconContainer>
        {icon}
        {data.type !== 'app' && (
          <SubIcon className={data.type} slim={slim}>
            {subIcon}
          </SubIcon>
        )}
      </IconContainer>
      <Article>
        <header className="mb-1">
          {title}
        </header>
        <div>{body}</div>
      </Article>
    </Container>
  );
  
}
