import React, { PropsWithChildren } from 'react';
import { FaBell, FaChevronCircleDown, FaChevronDown, FaCloud, FaCog, FaEllipsisH, FaEnvelope, FaHashtag, FaHome, FaServer } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { useAppSelector } from '../store';
import groundpolisIcon from '../assets/icon_transparent.svg';

const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr 300px;
  gap: var(--margin);
  max-height: 100vh;
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--margin);
`;

const Icon = styled.img`
  height: 3rem;
  filter: grayscale();
`;

const ProfileButton = styled.button`
  position: sticky;
  bottom: var(--margin);
`;

export default function BasicLayout(prop: PropsWithChildren<unknown>) {
  const {userCache} = useAppSelector(state => state.session);
  return (
    <LayoutContainer>
      <div>
        {userCache && (
          <ProfileButton className="card clickable fluid circle px-2 py-1 mb-2 flex f-left f-middle">
            <img src={userCache?.avatarUrl} className="circle mr-2" style={{height: 48}} />
            <span>{userCache?.name}</span>
            <FaChevronDown className="ml-auto" />
          </ProfileButton>
        )}
        <div className="menu large" style={{position: 'relative'}}>
          <section>
            <NavLink to="/" className={({isActive}) => `item clickable ${isActive ? 'active' : ''}`}>
              <FaHome className="icon" /> タイムライン
            </NavLink>
            <NavLink to="/notifications" className={({isActive}) => `item clickable ${isActive ? 'active' : ''}`}>
              <FaBell className="icon" /> 通知
            </NavLink>
            <NavLink to="/explore" className={({isActive}) => `item clickable ${isActive ? 'active' : ''}`}>
              <FaHashtag className="icon" /> みつける
            </NavLink>
            <NavLink to="/messaging" className={({isActive}) => `item clickable ${isActive ? 'active' : ''}`}>
              <FaEnvelope className="icon" /> メッセージ
            </NavLink>
            <NavLink to="/drive" className={({isActive}) => `item clickable ${isActive ? 'active' : ''}`}>
              <FaCloud className="icon" /> ファイル
            </NavLink>
          </section>
          <section>
            <NavLink to="/settings" className={({isActive}) => `item clickable ${isActive ? 'active' : ''}`}>
              <FaCog className="icon" /> 設定
            </NavLink>
            <NavLink to="/manage" className={({isActive}) => `item clickable ${isActive ? 'active' : ''}`}>
              <FaServer className="icon" /> サーバー管理
            </NavLink>
            <button className="item clickable">
              <FaEllipsisH className="icon" /> もっと！
            </button>
          </section>
        </div>
      </div>
      <div>{prop.children}</div>
      <div className="vstack">
        <div className="card">
          <div className="body">
            <h1 className="mb-2">ウィジェット</h1>
            <div className="skeleton" style={{height: 24}}></div>
          </div>
        </div>
        <div className="card">
          <div className="body">
            <h1 className="mb-2">ウィジェット</h1>
            <div className="skeleton" style={{height: 24}}></div>
          </div>
        </div>
        <div className="card">
          <div className="body">
            <h1 className="mb-2">ウィジェット</h1>
            <div className="skeleton" style={{height: 24}}></div>
          </div>
        </div>
        <div className="card">
          <div className="body">
            <h1 className="mb-2">ウィジェット</h1>
            <div className="skeleton" style={{height: 24}}></div>
          </div>
        </div>
      </div>
    </LayoutContainer>
  );
}
