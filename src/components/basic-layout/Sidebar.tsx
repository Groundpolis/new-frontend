import { toString } from 'misskey-js/built/acct';
import { UserDetailed } from 'misskey-js/built/entities';
import React, { HTMLProps } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useBreakpoints } from '../../hooks/useBreakpoints';
import { useAppDispatch, useAppSelector } from '../../store';
import { setVisibleMenu } from '../../store/screen';
import Avatar from '../common/Avatar';
import { MenuItem, MenuSection, MenuView } from '../common/MenuView';


const ProfileButton = styled(Link)`
  position: sticky;
  bottom: var(--margin);
  text-decoration: none;
  color: inherit;
  &:hover {
    color: inherit;
    text-decoration: none;
  }
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
        <ProfileButton to={`/@${toString(userCache)}`} className={`card circle clickable flex f-middle mb-2 ${p.slim ? 'f-center mx-auto pa-1' : 'px-2 py-1 f-left fluid'}`}>
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
      <MenuView style={{position: 'relative'}} slim={p.slim}>
        <MenuSection>
          {!isMobile && <MenuItem icon="fas fa-home" label={isLoggedIn ? 'タイムライン' : 'ホーム'} type="link" to="/" onClick={closeMenu} />}
          {!isMobile && <MenuItem id="notifications-link" icon="fas fa-bell" label="通知" type="link" to="/notifications" onClick={closeMenu} />}
          {!isMobile && <MenuItem icon="fas fa-hashtag" label="みつける" type="button" disabled />}
          {isLoggedIn && (
            <>
              {!isMobile && <MenuItem icon="fas fa-envelope" label="メッセージ" type="button" disabled />}
              <MenuItem icon="fas fa-cloud" label="ファイル" type="button" disabled />
            </>
          )}
        </MenuSection>
        <MenuSection>
          <MenuItem icon="fas fa-cog" label="設定" type="link" to="/settings" onClick={closeMenu} />
          {(userCache as UserDetailed)?.isModerator && (
            <MenuItem icon="fas fa-server" label="サーバー管理" type="button" disabled />
          )}
          {localStorage['debug'] === 'えびはうまい' && <MenuItem icon="fas fa-toolbox" label="デバッグモード" type="link" to="/debug" onClick={closeMenu} /> }
          <MenuItem icon="fas fa-ellipsis-h" label="もっと！" type="button" disabled/>
        </MenuSection>
        <MenuSection>
          <MenuItem icon="fas fa-smile" label="フィードバック" type="link" to="/feedback" onClick={closeMenu}/>
        </MenuSection>
      </MenuView>
    </div>
  );
}
