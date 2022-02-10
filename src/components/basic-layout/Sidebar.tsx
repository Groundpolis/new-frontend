import { UserDetailed } from 'misskey-js/built/entities';
import React, { HTMLProps } from 'react';
import { FaBell, FaChevronDown, FaCloud, FaCog, FaEllipsisH, FaEnvelope, FaHashtag, FaHome, FaServer, FaSmile, FaToolbox } from 'react-icons/fa';
import styled from 'styled-components';
import { notImpl } from '../../scripts/not-impl';
import { useAppSelector } from '../../store';
import Avatar from '../common/Avatar';
import { Menu, MenuItem, MenuSection } from '../common/Menu';


const ProfileButton = styled.button`
  position: sticky;
  bottom: var(--margin);
`;

const ProfileName = styled.span`
  width: 140px;
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export type SidebarProp = HTMLProps<HTMLDivElement> & {
  slim?: boolean;
};

export default function Sidebar(p: SidebarProp) {
  const {userCache} = useAppSelector(state => state.session);

  const isLoggedIn = Boolean(userCache);

  return (
    <div {...p}>
      {userCache && (
        <ProfileButton className={`card circle clickable flex f-middle mb-2 ${p.slim ? 'f-center mx-auto pa-1' : 'px-2 py-1 f-left fluid'}`}>
          <div className={!p.slim ? 'mr-1' : ''}>
            <Avatar user={userCache as UserDetailed} size={48} />
          </div>
          {!p.slim && (
            <>
              <ProfileName>{userCache?.name}</ProfileName>
              <FaChevronDown className="ml-auto" />
            </>
          )}
        </ProfileButton>
      )}
      <Menu style={{position: 'relative'}} slim={p.slim}>
        <MenuSection>
          <MenuItem icon={FaHome} label={isLoggedIn ? 'タイムライン' : 'ホーム'} type="link" to="/" />
          <MenuItem icon={FaBell} label="通知" type="link" to="/notifications" />
          <MenuItem icon={FaHashtag} label="みつける" type="button" onClick={notImpl} />
          {isLoggedIn && (
            <>
              <MenuItem icon={FaEnvelope} label="メッセージ" type="button" onClick={notImpl} />
              <MenuItem icon={FaCloud} label="ファイル" type="button" onClick={notImpl} />
            </>
          )}
        </MenuSection>
        <MenuSection>
          <MenuItem icon={FaCog} label="設定" type="link" to="/settings" />
          {(userCache as UserDetailed)?.isModerator && (
            <MenuItem icon={FaServer} label="サーバー管理" type="button" onClick={notImpl} />
          )}
          {localStorage['debug'] === 'えびはうまい' && <MenuItem icon={FaToolbox} label="デバッグモード" type="link" to="/debug" /> }
          <MenuItem icon={FaEllipsisH} label="もっと！" type="button" onClick={notImpl}/>
        </MenuSection>
        <MenuSection>
          <MenuItem icon={FaSmile} label="フィードバック" type="link" to="/feedback"/>
        </MenuSection>
      </Menu>
    </div>
  );
}
