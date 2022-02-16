import { UserDetailed } from 'misskey-js/built/entities';
import React, { HTMLProps } from 'react';
import styled from 'styled-components';
import { useBreakpoints } from '../../hooks/useBreakpoints';
import { notImpl } from '../../scripts/not-impl';
import { useAppDispatch, useAppSelector } from '../../store';
import { setVisibleMenu } from '../../store/screen';
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
  const dispatch = useAppDispatch();
  const {isMobile} = useBreakpoints();

  const isLoggedIn = Boolean(userCache);

  const closeMenu = () => dispatch(setVisibleMenu(false));

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
              <i className="fas fa-chevron-down ml-auto" />
            </>
          )}
        </ProfileButton>
      )}
      <Menu style={{position: 'relative'}} slim={p.slim}>
        <MenuSection>
          {!isMobile && <MenuItem icon="fas fa-home" label={isLoggedIn ? 'タイムライン' : 'ホーム'} type="link" to="/" onClick={closeMenu} />}
          {!isMobile && <MenuItem icon="fas fa-bell" label="通知" type="link" to="/notifications" onClick={closeMenu} />}
          {!isMobile && <MenuItem icon="fas fa-hashtag" label="みつける" type="button" onClick={notImpl} />}
          {isLoggedIn && (
            <>
              {!isMobile && <MenuItem icon="fas fa-envelope" label="メッセージ" type="button" onClick={notImpl} />}
              <MenuItem icon="fas fa-cloud" label="ファイル" type="button" onClick={notImpl} />
            </>
          )}
        </MenuSection>
        <MenuSection>
          <MenuItem icon="fas fa-cog" label="設定" type="link" to="/settings" onClick={closeMenu} />
          {(userCache as UserDetailed)?.isModerator && (
            <MenuItem icon="fas fa-server" label="サーバー管理" type="button" onClick={notImpl} />
          )}
          {localStorage['debug'] === 'えびはうまい' && <MenuItem icon="fas fa-toolbox" label="デバッグモード" type="link" to="/debug" onClick={closeMenu} /> }
          <MenuItem icon="fas fa-ellipsis-h" label="もっと！" type="button" onClick={notImpl}/>
        </MenuSection>
        <MenuSection>
          <MenuItem icon="fas fa-smile" label="フィードバック" type="link" to="/feedback" onClick={closeMenu}/>
        </MenuSection>
      </Menu>
    </div>
  );
}
