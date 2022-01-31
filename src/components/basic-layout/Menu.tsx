import { UserDetailed } from 'misskey-js/built/entities';
import React, { DOMAttributes, HTMLProps, MouseEventHandler, useMemo } from 'react';
import { IconType } from 'react-icons';
import { FaBell, FaChevronDown, FaCloud, FaCog, FaEllipsisH, FaEnvelope, FaHashtag, FaHome, FaServer } from 'react-icons/fa';
import { NavLink, To } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector } from '../../store';


const ProfileButton = styled.button`
  position: sticky;
  bottom: var(--margin);
`;

const ProfileName = styled.span`
  width: 160px;
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

type ItemProp = {
  icon: IconType,
  label: string,
} & ({
  type: 'link',
  to: To,
} | {
  type: 'a',
  href: string,
} | ({
  type: 'button',
  onClick?: MouseEventHandler<HTMLButtonElement>,
}));

function Item(p: ItemProp) {
  return p.type === 'link' ? (
    <NavLink className={({isActive}) => `item clickable ${isActive ? 'active' : ''}`} to={p.to}>
      <p.icon className="icon" />{p.label}
    </NavLink>
  ) : p.type === 'a' ? (
    <a className="item clickable" href={p.href} target="_blank" rel="noreferrer noopener">
      <p.icon className="icon" />{p.label}
    </a>
  ) : (
    <button className="item clickable" onClick={p.onClick}>
      <p.icon className="icon" />{p.label}
    </button>
  );
}

export default function Menu(p: HTMLProps<HTMLDivElement>) {
  const {userCache} = useAppSelector(state => state.session);

  const isLoggedIn = Boolean(userCache);

  return (
    <div {...p}>
      {userCache && (
        <ProfileButton className="card clickable fluid circle px-2 py-1 mb-2 flex f-left f-middle">
          <img src={userCache?.avatarUrl} className="circle mr-2" style={{height: 48}} />
          <ProfileName>{userCache?.name}</ProfileName>
          <FaChevronDown className="ml-auto" />
        </ProfileButton>
      )}
      <div className="menu large" style={{position: 'relative'}}>
        <section>
          <Item icon={FaHome} label={isLoggedIn ? 'タイムライン' : 'ホーム'} type="link" to="/" />
          <Item icon={FaBell} label="通知" type="link" to="/notifications" />
          <Item icon={FaHashtag} label="みつける" type="link" to="/explore" />
          {isLoggedIn && (
            <>
              <Item icon={FaEnvelope} label="メッセージ" type="link" to="/messaging" />
              <Item icon={FaCloud} label="ファイル" type="link" to="/drive" />
            </>
          )}
        </section>
        <section>
          <Item icon={FaCog} label="設定" type="link" to="/settings" />
          {(userCache as UserDetailed)?.isModerator && (
            <Item icon={FaServer} label="サーバー管理" type="link" to="/manage" />
          )}
          <Item icon={FaEllipsisH} label="もっと！" type="button" />
        </section>
      </div>
    </div>
  );
}
