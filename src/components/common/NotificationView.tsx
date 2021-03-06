import { toString } from 'misskey-js/built/acct';
import { Note, Notification, UserDetailed } from 'misskey-js/built/entities';
import React, { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { animationFade } from '../../animation';
import { getName } from '../../scripts/get-name';
import Avatar from './Avatar';
import EmojiView from './EmojiView';
import { GpfmView } from './GpfmView';
import NoteView from './note/NoteView';

const AppIcon = styled.img<{slim?: boolean}>`
  width: 42px;
  height: 42px;
`;

const IconContainer = styled.div<{slim?: boolean}>`
  position: relative;
  width: 42px;
  height: 42px;
`;

const StyledLink = styled(Link)`
    text-overflow: ellipsis;
    word-break: break-all;
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
    width: 100%;
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
  pointer-events: none;
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
  const [note, setNote] = useState<Note | null>(null);

  const isShowAsNote = data.type === 'quote' || data.type === 'reply' || data.type === 'mention';

  useLayoutEffect(() => {
    if (isShowAsNote) {
      setNote(data.note);
    }
  }, [isShowAsNote]);

  if (isShowAsNote) {
    return <NoteView note={note ?? data.note} onNoteUpdate={setNote} />;
  }

  const title = (() => {
    if (data.type === 'app') return <span>{data.header ?? null}</span>;
    const name = <Link style={{color: 'var(--fg)'}} to={`/@${toString(data.user)}`}><GpfmView plain text={getName(data.user)} emojis={data.user.emojis} /></Link>;
    switch (data.type) {
    case 'reaction': return <span>{name}?????????????????????????????????</span>;
    case 'renote': return <span>{name}???????????????????????????</span>;
    case 'follow': return <span>{name}??????????????????????????????</span>;
    case 'followRequestAccepted': return <span>{name}????????????????????????????????????</span>;
    case 'groupInvited': return <span>{name}????????????????????????????????????</span>;
    case 'receiveFollowRequest': return <span>{name}?????????????????????????????????????????????????????????</span>;
    case 'pollVote': return <span>{name}?????????????????????</span>;
    }
  })();

  const body = (() => {
    if (data.type === 'app') return <AppBody><GpfmView text={data.body} /></AppBody>;
    switch (data.type) {
    case 'reaction':
    case 'pollVote': {
      const note = data.note;
      return <StyledLink to={`/notes/${note.id}`} className="text-dimmed">{note.text || `${note.cw} [???????????????]`}</StyledLink>;
    }
    case 'renote': {
      const note = data.note;
      const renote = note.renote;
      return <StyledLink to={`/notes/${note.id}`} className="text-dimmed">{renote?.text || `${renote?.cw} [???????????????]`}</StyledLink>;
    }
    case 'receiveFollowRequest': return (
      <div className="vgroup fluid">
        <button className="btn primary"><i className="fas fa-check fa-fw" /></button>
        <button className="btn danger"><i className="fas fa-times fa-fw" /></button>
      </div>
    );
    case 'follow': return (
      <Link to={`/@${toString(data.user)}`} className="btn">?????????????????????????????????</Link>
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
    case 'follow': return <i className="fas fa-plus fa-fw" />;
    case 'followRequestAccepted': return <i className="fas fa-check fa-fw" />;
    case 'groupInvited': return <i className="fas fa-id-card-alt fa-fw" />;
    case 'pollVote': return <i className="fas fa-poll-h fa-fw" />;
    case 'reaction': return <EmojiView emoji={data.reaction} customEmojis={data.note.emojis} normal />;
    case 'receiveFollowRequest': return <i className="fas fa-clock fa-fw" />;
    case 'renote': return <i className="fas fa-retweet fa-fw" />;
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
