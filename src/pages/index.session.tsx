import React from 'react';
import { FaBullhorn, FaChevronDown, FaChevronUp, FaComments, FaGlobe, FaHome, FaShareAlt } from 'react-icons/fa';
import styled from 'styled-components';
import { initSession } from '../scripts/init-session';
import { useAppSelector } from '../store';

const ActionBar = styled.div`
  display: flex;
  padding-left: var(--margin);
  > .item {
    height: 50px;
    margin: 0;
  }
`;

const ActionBarButton = styled.button`
  display: flex;
  color: var();
  width: 50px;
  align-items: center;
  justify-content: center;
  &:hover {
    background: var(--hover);
  }
`;

export default function SessionPage() {
  const {userCache} = useAppSelector(state => state.session);
  if (!userCache) return null;
  return (
    <>
      <header className="bg-panel rounded">
        <ActionBar>
          <div className="item flex text-center fluid f-middle" style={{flex: 1}}>
            <FaHome className="mr-2"/>
            タイムライン
          </div>
          <ActionBarButton className="item clickable"><FaBullhorn /></ActionBarButton>
          <ActionBarButton className="item clickable text-dimmed" style={{background: 'var(--hover)'}}><FaChevronUp /></ActionBarButton>
        </ActionBar>
        <div className="menu pa-1" style={{borderTop: '1px solid var(--tone-1)'}}>
          <button className="item">
            <FaHome className="icon" /> ホーム
          </button>
          <button className="item">
            <FaComments className="icon" /> ローカル
          </button>
          <button className="item">
            <FaShareAlt className="icon" /> ホーム + ローカル
          </button>
          <button className="item">
            <FaGlobe className="icon" /> グローバル
          </button>
        </div>
      </header>
      <div className="container">
        <p>ようこそ、{userCache.name}。</p>
        <button className="btn danger" onClick={initSession}>ログアウト</button>
      </div>
    </>
  );
}
